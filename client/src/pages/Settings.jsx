import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Key, Bell, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  
  // Profile State
  const [name, setName] = useState(user?.name || '');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });

  // Security State
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [securityLoading, setSecurityLoading] = useState(false);
  const [securityMessage, setSecurityMessage] = useState({ type: '', text: '' });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage({ type: '', text: '' });
    
    try {
      await updateProfile({ name });
      setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setProfileMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setProfileLoading(false);
      setTimeout(() => setProfileMessage({ type: '', text: '' }), 3000);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      return setSecurityMessage({ type: 'error', text: 'Passwords do not match' });
    }
    
    setSecurityLoading(true);
    setSecurityMessage({ type: '', text: '' });
    
    try {
      await updateProfile({ password: passwords.new });
      setSecurityMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      setSecurityMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update password' });
    } finally {
      setSecurityLoading(false);
      setTimeout(() => setSecurityMessage({ type: '', text: '' }), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-['Outfit'] tracking-tight mb-2">Account Settings</h1>
        <p className="text-text-muted">Manage your profile, preferences, and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 space-y-6">
          <div className="glass p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="text-primary" />
              Profile Information
            </h2>
            
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block ml-1 text-text-muted">Full Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block ml-1 text-text-muted">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input type="email" className="input-field pl-10 bg-white/5 cursor-not-allowed" defaultValue={user?.email || ''} readOnly />
                  </div>
                </div>
              </div>
              
              <AnimatePresence>
                {profileMessage.text && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex items-center gap-2 text-sm p-3 rounded-lg ${profileMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}
                  >
                    {profileMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {profileMessage.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <button disabled={profileLoading} className="btn-primary py-2.5 px-6 flex items-center gap-2">
                {profileLoading && <Loader2 className="animate-spin" size={18} />}
                {profileLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          <div className="glass p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Key className="text-primary" />
              Security & Password
            </h2>
            
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div>
                <label className="text-sm font-semibold mb-2 block ml-1 text-text-muted">Current Password</label>
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="••••••••"
                  value={passwords.current}
                  onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block ml-1 text-text-muted">New Password</label>
                  <input 
                    type="password" 
                    className="input-field" 
                    placeholder="••••••••"
                    value={passwords.new}
                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block ml-1 text-text-muted">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="input-field" 
                    placeholder="••••••••"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  />
                </div>
              </div>

              <AnimatePresence>
                {securityMessage.text && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex items-center gap-2 text-sm p-3 rounded-lg ${securityMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}
                  >
                    {securityMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {securityMessage.text}
                  </motion.div>
                )}
              </AnimatePresence>

              <button disabled={securityLoading} className="btn-primary py-2.5 px-6 flex items-center gap-2">
                {securityLoading && <Loader2 className="animate-spin" size={18} />}
                {securityLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="glass p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Shield className="text-primary" size={18} />
              Account Status
            </h3>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-primary">Pro Plan</span>
                <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">Active</span>
              </div>
              <p className="text-sm text-text-muted">Your account has unlimited asset tracking capabilities.</p>
            </div>
          </div>

          <div className="glass p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Bell className="text-primary" size={18} />
              Preferences
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm font-medium">Email Alerts</span>
                <input type="checkbox" className="w-4 h-4 rounded accent-primary" defaultChecked />
              </label>
              <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-sm font-medium">Monthly Summary</span>
                <input type="checkbox" className="w-4 h-4 rounded accent-primary" defaultChecked />
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;

