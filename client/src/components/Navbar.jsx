import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, LogOut, LayoutDashboard, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (user) return null; // Defensive check, but App.jsx handles this

  return (
    <nav className="bg-transparent absolute top-0 w-full z-50">
      <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className="text-3xl font-black font-['Outfit'] tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#4ade80] via-[#38bdf8] to-[#f472b6]">
          warrantyvault
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="px-5 py-2.5 rounded-lg border border-white/10 text-sm font-semibold hover:bg-white/5 transition-all text-white">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

