import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, LogOut, LayoutDashboard, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
      // The actual scroll will happen via LandingPage's useEffect or browser behavior if handled
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (user) return null;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 h-20' 
          : 'bg-transparent h-24'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="text-3xl font-black font-['Outfit'] tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#4ade80] via-[#38bdf8] to-[#f472b6]">
          warrantyvault
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-300">
          <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
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

