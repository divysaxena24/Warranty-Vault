import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetails';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

const Layout = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#090b10] flex relative overflow-hidden font-['Inter']">
      {/* Global Ambient Glows */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#1a4f54] rounded-full blur-[150px] opacity-20 mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#4a1c38] rounded-full blur-[150px] opacity-20 mix-blend-screen pointer-events-none translate-y-1/4 -translate-x-1/4 z-0"></div>

      {user && <Sidebar />}
      <div className={`flex-1 flex flex-col relative z-10 ${user ? 'lg:ml-64' : ''}`}>
        {!user && <Navbar />}
        <main className={`flex-1 ${user ? 'p-8' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/add-product" element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            } />
            <Route path="/product/:id" element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            } />
            <Route path="/notifications" element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            } />
            <Route path="/settings" element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            } />
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;

