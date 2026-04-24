import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Upload, ArrowLeft, Save, ShieldPlus, Info, Calendar } from 'lucide-react';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    category: '',
    purchaseDate: '',
    warrantyPeriod: '',
    price: '',
    serialNumber: '',
    notes: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('invoice', file);

    try {
      await api.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold">Back to Dashboard</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="glass p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ShieldPlus size={120} className="text-primary" />
        </div>

        <div className="mb-10 relative">
          <h1 className="text-4xl font-bold font-['Outfit'] mb-2 flex items-center gap-3">
            <ShieldPlus className="text-primary" size={36} />
            Register New Asset
          </h1>
          <p className="text-text-muted">Enter product details to start tracking its warranty life-cycle.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative">
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Info size={14} />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group md:col-span-2">
                <label className="text-sm font-semibold mb-2 block ml-1">Product Name</label>
                <input name="productName" value={formData.productName} onChange={handleChange} required className="input-field py-4" placeholder="e.g. MacBook Pro M3" />
              </div>

              <div className="form-group">
                <label className="text-sm font-semibold mb-2 block ml-1">Brand / Manufacturer</label>
                <input name="brand" value={formData.brand} onChange={handleChange} required className="input-field" placeholder="e.g. Apple" />
              </div>

              <div className="form-group">
                <label className="text-sm font-semibold mb-2 block ml-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="input-field appearance-none">
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Calendar size={14} />
              Purchase & Warranty
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-group">
                <label className="text-sm font-semibold mb-2 block ml-1">Purchase Date</label>
                <input name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} required className="input-field" />
              </div>

              <div className="form-group">
                <label className="text-sm font-semibold mb-2 block ml-1">Warranty (Months)</label>
                <input name="warrantyPeriod" type="number" value={formData.warrantyPeriod} onChange={handleChange} required className="input-field" placeholder="12" />
              </div>

              <div className="form-group">
                <label className="text-sm font-semibold mb-2 block ml-1">Price ($)</label>
                <input name="price" type="number" value={formData.price} onChange={handleChange} className="input-field" placeholder="0.00" />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Upload size={14} />
              Documentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="text-sm font-semibold mb-2 block ml-1">Serial Number</label>
                <input name="serialNumber" value={formData.serialNumber} onChange={handleChange} className="input-field" placeholder="Optional" />
              </div>

              <div className="form-group">
                <label className="text-sm font-semibold mb-2 block ml-1">Invoice Document</label>
                <div className="relative group h-[52px]">
                  <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="input-field flex items-center justify-between group-hover:border-primary/50 transition-colors bg-white/5">
                    <span className="text-text-muted truncate">
                      {file ? <span className="text-white">{file.name}</span> : 'Upload invoice (Image/PDF)'}
                    </span>
                    <Upload size={18} className="text-primary shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="form-group">
            <label className="text-sm font-semibold mb-2 block ml-1">Additional Notes</label>
            <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} className="input-field" placeholder="Any additional details like retailer info, model variant, etc."></textarea>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading} 
              className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 shadow-xl"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                  Saving to Vault...
                </>
              ) : (
                <>
                  <Save size={22} />
                  Securely Save Asset
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;

