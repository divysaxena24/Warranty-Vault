import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Bell, 
  ShieldCheck, 
  LogOut,
  Settings,
  Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass rounded-none border-y-0 border-l-0 z-40 hidden lg:flex flex-col p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <ShieldCheck size={32} className="text-primary" />
        <h1 className="text-xl font-bold tracking-tight font-['Outfit']">WarrantyVault</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/add-product" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <PlusCircle size={20} />
          <span>Add Asset</span>
        </NavLink>

        <NavLink 
          to="/notifications" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Bell size={20} />
          <span>Notifications</span>
        </NavLink>

        <div className="pt-6 pb-2 px-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Management</span>
        </div>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

        {user?.role === 'admin' && (
          <>
            <div className="pt-6 pb-2 px-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Administration</span>
            </div>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <ShieldCheck size={20} />
              <span>System Admin</span>
            </NavLink>
          </>
        )}
      </nav>

      <div className="mt-auto">
        <div className="glass p-4 mb-4 bg-primary/5 border-primary/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold uppercase border border-primary/30">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs text-text-muted mb-0.5">Logged in as</p>
            <p className="font-semibold truncate text-sm">{user?.name}</p>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="sidebar-link w-full text-left text-expired hover:bg-expired/10"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
