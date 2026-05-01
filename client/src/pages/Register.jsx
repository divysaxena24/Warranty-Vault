import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ShieldCheck, User, Mail, Lock, UserPlus, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Validate password on change
  useEffect(() => {
    const p = formData.password;
    setPasswordCriteria({
      length: p.length >= 8,
      uppercase: /[A-Z]/.test(p),
      lowercase: /[a-z]/.test(p),
      number: /[0-9]/.test(p),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(p),
    });
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all criteria are met
    const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
    if (!isPasswordValid) {
      return setError('Please ensure your password meets all requirements.');
    }

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    
    setLoading(true);
    setError('');
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const Criterion = ({ met, text }) => (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-active' : 'text-text-muted'}`}>
      {met ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-32 pb-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 w-full max-w-lg shadow-2xl relative overflow-hidden"
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
          <h1 className="text-3xl font-bold font-['Outfit'] mb-2">Join the Vault</h1>
          <p className="text-text-muted">Start tracking your assets securely today</p>
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

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  name="name"
                  type="text" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="input-field pl-10"
                  placeholder="John Doe"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  name="email"
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="input-field pl-10"
                  placeholder="name@example.com"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                name="password"
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-white/5 p-4 rounded-xl mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2"
              >
                <Criterion met={passwordCriteria.length} text="At least 8 characters" />
                <Criterion met={passwordCriteria.uppercase} text="One uppercase letter" />
                <Criterion met={passwordCriteria.lowercase} text="One lowercase letter" />
                <Criterion met={passwordCriteria.number} text="One number" />
                <Criterion met={passwordCriteria.special} text="One special character" />
              </motion.div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                name="confirmPassword"
                type="password" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full mt-6 flex items-center justify-center gap-2 group"
          >
            {loading ? 'Creating Account...' : (
              <>
                Create Account
                <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-bold transition-colors">
            Sign In instead
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;


