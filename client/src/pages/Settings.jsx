import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Key, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const { user } = useAuth();

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
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block ml-1 text-text-muted">Full Name</label>
                  <input type="text" className="input-field" defaultValue={user?.name || ''} />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block ml-1 text-text-muted">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input type="email" className="input-field pl-10 bg-white/5 cursor-not-allowed" defaultValue={user?.email || ''} readOnly />
                  </div>
                </div>
              </div>
              <button type="button" className="btn-primary py-2.5 px-6">Save Changes</button>
            </form>
          </div>

          <div className="glass p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Key className="text-primary" />
              Security & Password
            </h2>
            
            <form className="space-y-6">
              <div>
                <label className="text-sm font-semibold mb-2 block ml-1 text-text-muted">Current Password</label>
                <input type="password" className="input-field" placeholder="••••••••" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-2 block ml-1 text-text-muted">New Password</label>
                  <input type="password" className="input-field" placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block ml-1 text-text-muted">Confirm New Password</label>
                  <input type="password" className="input-field" placeholder="••••••••" />
                </div>
              </div>
              <button type="button" className="btn-primary py-2.5 px-6">Update Password</button>
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
