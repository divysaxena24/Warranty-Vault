import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-32 pb-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
      >
        <Link 
          to="/" 
          className="absolute top-6 left-6 text-text-muted hover:text-white transition-colors flex items-center gap-2 text-sm font-medium group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        <div className="text-center mb-8 relative mt-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <ShieldCheck size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-['Outfit'] mb-2">Welcome Back</h1>
          <p className="text-text-muted">Sign in to manage your digital vault</p>
        </div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="input-field pl-10"
                placeholder="name@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full mt-4 flex items-center justify-center gap-2 group"
          >
            {loading ? 'Signing in...' : (
              <>
                Sign In
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-text-muted">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:text-primary-hover font-bold transition-colors">
            Create one for free
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

