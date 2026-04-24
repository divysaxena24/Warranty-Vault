import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Users, Database, ShieldCheck, Trash2, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [sysData, setSysData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const fetchData = async () => {
    try {
      const [sysRes, userRes] = await Promise.all([
        api.get('/admin/system'),
        api.get('/admin/users')
      ]);
      setSysData(sysRes.data);
      setUsersList(userRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user and all their assets? This action cannot be undone.')) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchData();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-['Outfit'] tracking-tight mb-2 text-white flex items-center gap-3">
            <ShieldCheck className="text-primary" size={36} />
            System Administration
          </h1>
          <p className="text-text-muted text-lg">Monitor platform data and manage users.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="flex items-center justify-between w-full mb-4 relative z-10">
            <span className="text-sm font-bold uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">Total Platform Users</span>
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
              <Users size={22} />
            </div>
          </div>
          <div className="w-full flex items-end justify-between relative z-10 mt-2">
            <div className="text-5xl font-bold font-['Outfit'] tracking-tight">{sysData?.stats?.users || 0}</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ec4899]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="flex items-center justify-between w-full mb-4 relative z-10">
            <span className="text-sm font-bold uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">Total Tracked Assets</span>
            <div className="p-2.5 bg-[#ec4899]/10 text-[#ec4899] rounded-xl">
              <Database size={22} />
            </div>
          </div>
          <div className="w-full flex items-end justify-between relative z-10 mt-2">
            <div className="text-5xl font-bold font-['Outfit'] tracking-tight">{sysData?.stats?.assets || 0}</div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Users className="text-primary" />
          User Management
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="text-xs uppercase bg-white/5 text-white/70">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg">User ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((u) => (
                <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{u._id}</td>
                  <td className="px-6 py-4 font-medium text-white">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${u.role === 'admin' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/10 text-text-muted'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {u.role !== 'admin' && (
                      <button 
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-2 text-expired hover:bg-expired/10 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
