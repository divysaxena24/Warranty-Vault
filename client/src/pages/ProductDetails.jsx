import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import StatusBadge from '../components/StatusBadge';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Calendar, FileText, Settings, Plus, Loader2, Clock, DollarSign, Tag, ExternalLink, Upload } from 'lucide-react';


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMaintForm, setShowMaintForm] = useState(false);
  const [maintData, setMaintData] = useState({ serviceDate: '', description: '', cost: '' });

  const fetchData = async () => {
    try {
      const [prodRes, maintRes] = await Promise.all([
        api.get(`/products/${id}`),
        api.get(`/maintenance/${id}`)
      ]);
      setProduct(prodRes.data);
      setMaintenance(maintRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      await api.delete(`/products/${id}`);
      navigate('/');
    }
  };

  const handleMaintSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/maintenance/${id}`, maintData);
      setMaintData({ serviceDate: '', description: '', cost: '' });
      setShowMaintForm(false);
      fetchData();
    } catch (err) {
      alert('Failed to add maintenance record');
    }
  };

  const deleteMaint = async (mId) => {
    if (window.confirm('Remove this record?')) {
      await api.delete(`/maintenance/${mId}`);
      fetchData();
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-40">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-muted hover:text-white">
          <ArrowLeft size={18} />
          Back
        </button>
        <button onClick={handleDelete} className="flex items-center gap-2 text-expired hover:bg-expired/10 px-4 py-2 rounded-lg transition-colors">
          <Trash2 size={18} />
          Delete Asset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-8">
          <div className="glass p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{product.productName}</h1>
                <p className="text-xl text-text-muted">{product.brand}</p>
              </div>
              <StatusBadge status={product.status} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-white/5">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Category</p>
                <p className="font-semibold">{product.category}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Serial Number</p>
                <p className="font-semibold">{product.serialNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Price</p>
                <p className="font-semibold text-xl">${product.price}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="flex items-center gap-3">
                <Calendar className="text-primary" />
                <div>
                  <p className="text-xs text-text-muted">Purchase Date</p>
                  <p className="font-medium">{new Date(product.purchaseDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-primary" />
                <div>
                  <p className="text-xs text-text-muted">Expiry Date</p>
                  <p className="font-medium">{new Date(product.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {product.notes && (
              <div className="mt-8">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Notes</p>
                <p className="text-text-muted bg-white/5 p-4 rounded-lg italic">"{product.notes}"</p>
              </div>
            )}
          </div>

          {/* Invoice Preview */}
          <div className="glass p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-primary" />
              Invoice Document
            </h2>
            {product.invoiceUrl ? (
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <p className="mb-4 text-text-muted">Invoice file is stored securely.</p>
                <a 
                  href={`http://localhost:5000${product.invoiceUrl}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Upload size={18} />
                  View Original Invoice
                </a>
              </div>
            ) : (
              <p className="text-text-muted italic text-center py-8">No invoice uploaded for this asset.</p>
            )}
          </div>
        </motion.div>

        {/* Maintenance History */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="glass p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Settings className="text-primary" />
                Service History
              </h2>
              <button 
                onClick={() => setShowMaintForm(!showMaintForm)}
                className="p-1 hover:bg-white/10 rounded transition-colors text-primary"
              >
                <Plus size={24} />
              </button>
            </div>

            {showMaintForm && (
              <form onSubmit={handleMaintSubmit} className="mb-8 p-6 glass rounded-lg border border-[#38bdf8]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#38bdf8]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-white/70 relative z-10">New Maintenance Record</h3>
                <div className="space-y-4 relative z-10">
                  <input 
                    type="date" 
                    required 
                    value={maintData.serviceDate}
                    onChange={(e) => setMaintData({...maintData, serviceDate: e.target.value})}
                    className="input-field"
                  />
                  <input 
                    type="text" 
                    placeholder="Service Description" 
                    required 
                    value={maintData.description}
                    onChange={(e) => setMaintData({...maintData, description: e.target.value})}
                    className="input-field"
                  />
                  <input 
                    type="number" 
                    placeholder="Cost ($)" 
                    required 
                    value={maintData.cost}
                    onChange={(e) => setMaintData({...maintData, cost: e.target.value})}
                    className="input-field"
                  />
                  <div className="flex gap-4 pt-2">
                    <button type="submit" className="btn-primary flex-1 py-3 text-sm">Add Record</button>
                    <button type="button" onClick={() => setShowMaintForm(false)} className="px-6 py-3 border border-white/10 hover:bg-white/10 rounded-xl transition-colors font-semibold text-sm">Cancel</button>
                  </div>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {maintenance.length > 0 ? maintenance.map((record) => (
                <div key={record._id} className="maintenance-item group">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-sm">{record.description}</p>
                    <button onClick={() => deleteMaint(record._id)} className="opacity-0 group-hover:opacity-100 text-expired transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-text-muted">
                    <span>{new Date(record.serviceDate).toLocaleDateString()}</span>
                    <span className="font-bold text-white">${record.cost}</span>
                  </div>
                </div>
              )) : (
                <p className="text-center text-sm text-text-muted py-8">No maintenance history recorded yet.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
