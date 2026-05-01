import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Bell, Calendar, FileText, ShieldCheck, CheckCircle2, Mail, Users, Zap, Database, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const LandingPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      await api.post('/contact', formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (error) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: error.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#090b10] relative overflow-x-hidden flex flex-col font-['Inter'] text-white selection:bg-[#ec4899]/30">
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#38bdf8]/20 bg-[#38bdf8]/10 text-[#38bdf8] font-semibold text-sm mb-12 shadow-[0_0_15px_rgba(56,189,248,0.2)] backdrop-blur-md"
          >
            <Sparkles size={16} />
            Trusted by 5,000+ asset managers worldwide
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center justify-center font-black font-['Outfit'] tracking-tighter leading-[0.9] uppercase relative"
          >
            <span className="text-[clamp(3.5rem,10vw,8rem)] text-white">ASSET</span>
            <span className="text-[clamp(3rem,9vw,7.5rem)] text-white mt-1">MANAGEMENT</span>
            <span 
              className="text-[clamp(2.5rem,8vw,7rem)] mt-2 pb-6"
              style={{
                background: 'linear-gradient(to right, #4ade80, #38bdf8, #ec4899, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              WITHOUT THE CHAOS
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mt-8 mb-12 font-medium leading-relaxed"
          >
            Transform scattered receipts into seamless tracking. WarrantyVault 
            brings clarity, speed, and peace of mind to your digital vault.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/register" 
              className="px-10 py-4 rounded-xl font-bold text-white text-lg transition-all bg-gradient-to-r from-[#2dd4bf] to-[#ec4899] hover:opacity-90 shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:scale-105"
            >
              Start Free Trial
            </Link>
            <a href="#features" className="px-10 py-4 rounded-xl font-bold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-all text-lg hover:scale-105">
              Explore Features
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative z-10 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black font-['Outfit'] mb-6">Everything you need. <span className="text-[#38bdf8]">Nothing you don't.</span></h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">A powerful suite of tools designed to protect your valuable assets and eliminate manual tracking.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-10 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 bg-[#38bdf8]/10 rounded-2xl flex items-center justify-center mb-8 text-[#38bdf8] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                <Bell size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Expiry Alerts</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Receive proactive notifications via email and dashboard before your product warranties expire, so you never miss a claim window again.
              </p>
            </div>

            <div className="glass p-10 hover:-translate-y-2 transition-transform duration-300 group border-[#ec4899]/30 shadow-[0_0_30px_rgba(236,72,153,0.1)]">
              <div className="w-16 h-16 bg-[#ec4899]/10 rounded-2xl flex items-center justify-center mb-8 text-[#ec4899] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                <FileText size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Digital Invoices</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Securely upload and store PDFs or photos of your original purchase receipts. Throw away the filing cabinet and access documents instantly.
              </p>
            </div>

            <div className="glass p-10 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-16 h-16 bg-[#f59e0b]/10 rounded-2xl flex items-center justify-center mb-8 text-[#f59e0b] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Database size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Maintenance Logs</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Track the complete service history and repair costs for all your assets over their lifetime, right alongside their warranty data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black font-['Outfit'] mb-6">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Start tracking your assets today. Upgrade when you need more power.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="glass p-10 rounded-3xl relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-2">Personal Vault</h3>
              <p className="text-gray-400 mb-8">Perfect for personal electronics and home appliances.</p>
              <div className="mb-8">
                <span className="text-6xl font-black font-['Outfit']">$0</span>
                <span className="text-gray-400">/forever</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['Track up to 50 assets', 'Basic email notifications', '50MB invoice storage', 'Community support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="text-[#4ade80]" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block w-full py-4 rounded-xl font-bold text-center border border-white/20 hover:bg-white/10 transition-colors">
                Get Started Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="glass p-10 rounded-3xl relative overflow-hidden border-[#38bdf8]/30 shadow-[0_0_50px_rgba(56,189,248,0.15)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8]/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
              <div className="absolute top-6 right-6 px-4 py-1 bg-[#38bdf8]/20 text-[#38bdf8] text-xs font-bold uppercase tracking-widest rounded-full">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro Manager</h3>
              <p className="text-gray-400 mb-8">For power users and small businesses.</p>
              <div className="mb-8">
                <span className="text-6xl font-black font-['Outfit']">$9</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['Unlimited asset tracking', 'Advanced SMS & Email alerts', 'Unlimited cloud storage', 'Detailed maintenance analytics', 'Priority 24/7 support'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium">
                    <CheckCircle2 className="text-[#38bdf8]" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="block w-full py-4 rounded-xl font-bold text-center bg-gradient-to-r from-[#38bdf8] to-[#6366f1] hover:opacity-90 transition-opacity shadow-lg">
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About & Contact Grid */}
      <section className="py-24 relative z-10 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* About */}
          <div id="about">
            <div className="inline-flex items-center justify-center p-3 bg-[#ec4899]/10 rounded-2xl mb-6 text-[#ec4899]">
              <Users size={28} />
            </div>
            <h2 className="text-3xl font-black font-['Outfit'] mb-6">About WarrantyVault</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Born from the frustration of lost receipts and expired warranties, WarrantyVault was built by a passionate team of developers who believe that managing your assets shouldn't be a full-time job. 
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              We leverage modern web technologies and secure cloud infrastructure to ensure that when your valuable electronics break down, your proof of purchase is exactly where you need it, instantly.
            </p>
          </div>

          {/* Contact */}
          <div id="contact" className="glass p-10 rounded-3xl relative overflow-hidden">
            <h2 className="text-3xl font-black font-['Outfit'] mb-2">Get in touch</h2>
            <p className="text-gray-400 mb-8">Have a question or want to request a feature? We'd love to hear from you.</p>
            
            {status.success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/20 p-8 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. We'll get back to you shortly.</p>
                <button 
                  onClick={() => setStatus({ ...status, success: false })}
                  className="mt-6 text-sm font-semibold text-[#38bdf8] hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {status.error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-sm font-medium">
                    {status.error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-300">Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#38bdf8] transition-colors" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-300">Email</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#38bdf8] transition-colors" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block text-gray-300">Message</label>
                  <textarea 
                    name="message"
                    rows="4" 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#38bdf8] transition-colors" 
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <button 
                  disabled={status.loading}
                  className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Mail size={20} />
                  )}
                  {status.loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/60 relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="text-[#38bdf8]" size={28} />
          <span className="text-2xl font-black font-['Outfit'] tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#4ade80] via-[#38bdf8] to-[#f472b6]">
            warrantyvault
          </span>
        </div>
        <p className="text-gray-500 font-medium">© {new Date().getFullYear()} WarrantyVault Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
