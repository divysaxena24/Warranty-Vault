import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Search, Loader2, Package, Clock, AlertTriangle, Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [stats, setStats] = useState({ total: 0, expiring: 0, expired: 0 });

  const fetchProducts = async () => {
    try {
      const { data } = await api.get(`/products?keyword=${keyword}`);
      setProducts(data.products);
      
      const total = data.products.length;
      const expiring = data.products.filter(p => p.status === 'expiring soon').length;
      const expired = data.products.filter(p => p.status === 'expired').length;
      setStats({ total, expiring, expired });
      
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword]);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-['Outfit'] tracking-tight mb-2 text-white">My Asset Vault</h1>
          <p className="text-text-muted text-lg">Securely track and manage your digital warranties.</p>
        </div>
        <Link to="/add-product" className="px-6 py-3 rounded-xl font-bold text-white transition-all bg-gradient-to-r from-[#2dd4bf] to-[#ec4899] hover:opacity-90 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] flex items-center gap-2 self-start md:self-auto">
          <Plus size={20} />
          Add New Asset
        </Link>
      </header>

      {/* Stats Section */}
      <div className="stats-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass stat-card group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#38bdf8]/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#38bdf8]/20 transition-colors"></div>
          <div className="flex items-center justify-between w-full mb-4 relative z-10">
            <span className="text-sm font-bold uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">Total Assets</span>
            <div className="p-2.5 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Package size={22} />
            </div>
          </div>
          <div className="w-full flex items-end justify-between relative z-10 mt-2">
            <div className="stat-value text-5xl">{stats.total}</div>
            <div className="text-xs font-semibold text-[#4ade80] bg-[#4ade80]/10 px-2 py-1 rounded-md border border-[#4ade80]/20">+3 This month</div>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass stat-card group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e0b]/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#f59e0b]/20 transition-colors"></div>
          <div className="flex items-center justify-between w-full mb-4 relative z-10">
            <span className="text-sm font-bold uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">Expiring Soon</span>
            <div className="p-2.5 bg-[#f59e0b]/10 text-[#f59e0b] rounded-xl group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Clock size={22} />
            </div>
          </div>
          <div className="w-full flex items-end justify-between relative z-10 mt-2">
            <div className="stat-value text-5xl">{stats.expiring}</div>
            <div className="text-xs font-semibold text-text-muted">Next 30 days</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass stat-card group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ec4899]/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#ec4899]/20 transition-colors"></div>
          <div className="flex items-center justify-between w-full mb-4 relative z-10">
            <span className="text-sm font-bold uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">Expired</span>
            <div className="p-2.5 bg-[#ec4899]/10 text-[#ec4899] rounded-xl group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(236,72,153,0.2)]">
              <AlertTriangle size={22} />
            </div>
          </div>
          <div className="w-full flex items-end justify-between relative z-10 mt-2">
            <div className="stat-value text-5xl">{stats.expired}</div>
            <div className="text-xs font-semibold text-[#ec4899] bg-[#ec4899]/10 px-2 py-1 rounded-md border border-[#ec4899]/20">Requires action</div>
          </div>
        </motion.div>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search assets by name, brand, or category..." 
            className="input-field pl-12 py-4 text-lg"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <button className="glass p-4 text-text-muted hover:text-white hover:border-white/20 transition-all">
          <Filter size={20} />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      ) : products.length > 0 ? (
        <div className="dashboard-grid">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="product-card-hover h-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-16 text-center border border-dashed border-white/20 flex flex-col items-center justify-center max-w-3xl mx-auto mt-12 bg-transparent"
        >
          <div className="relative mb-8 group cursor-default">
            <div className="p-8 bg-dark-bg rounded-full relative z-10 border border-white/10 shadow-xl">
              <Package className="text-text-muted" size={64} strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-4xl font-bold font-['Outfit'] mb-4 tracking-tight">Your vault is empty</h2>
          <p className="text-text-muted text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Start building your digital inventory. Upload invoices, track warranty periods, and manage all your assets in one secure place.
          </p>
          <Link to="/add-product" className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4 shadow-lg shadow-primary/20">
            <Plus size={24} />
            Add Your First Asset
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;

