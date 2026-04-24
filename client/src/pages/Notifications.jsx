import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Bell, Clock, AlertTriangle, ChevronRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';

const Notifications = () => {
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/products');
        // Filter products expiring soon or already expired
        const relevant = data.products.filter(p => 
          p.status === 'expiring soon' || p.status === 'expired'
        );
        setExpiringProducts(relevant);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="container py-8 max-w-4xl">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Bell className="text-primary" />
          Notifications
        </h1>
        <p className="text-text-muted">Stay updated on your warranty statuses and maintenance schedules.</p>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 px-2">Warranty Alerts</h2>
          
          {loading ? (
            <div className="glass p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mx-auto"></div>
            </div>
          ) : expiringProducts.length > 0 ? (
            <div className="space-y-4">
              {expiringProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={`/product/${product._id}`} 
                    className="glass p-5 flex items-center gap-4 group hover:bg-white/5 transition-all border-l-4 border-l-expiring"
                    style={{ borderLeftColor: product.status === 'expired' ? 'var(--expired)' : 'var(--expiring)' }}
                  >
                    <div className={`p-3 rounded-xl ${product.status === 'expired' ? 'bg-expired/10 text-expired' : 'bg-expiring/10 text-expiring'}`}>
                      {product.status === 'expired' ? <AlertTriangle size={24} /> : <Clock size={24} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold">{product.productName}</h3>
                        <StatusBadge status={product.status} />
                      </div>
                      <p className="text-sm text-text-muted">
                        {product.status === 'expired' 
                          ? `Warranty expired on ${new Date(product.expiryDate).toLocaleDateString()}`
                          : `Warranty expires in less than 30 days (${new Date(product.expiryDate).toLocaleDateString()})`
                        }
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass p-12 text-center">
              <Package className="mx-auto mb-4 text-text-muted opacity-20" size={48} />
              <h3 className="text-xl font-semibold mb-1">All clear!</h3>
              <p className="text-text-muted">No urgent warranty expirations at the moment.</p>
            </div>
          )}
        </section>

        <section className="opacity-50 pointer-events-none">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4 px-2">System Updates</h2>
          <div className="glass p-6">
            <p className="text-sm text-text-muted italic">No recent system notifications.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Notifications;
