import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="glass product-card block no-underline text-inherit group h-full flex flex-col p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors tracking-tight mb-1">
            {product.productName}
          </h3>
          <p className="text-sm text-text-muted font-medium">{product.brand}</p>
        </div>
        <StatusBadge status={product.status} />
      </div>

      <div className="space-y-3 mb-8 flex-1">
        <div className="flex items-center gap-3 text-sm text-text-muted bg-white/5 p-3 rounded-lg">
          <Tag size={16} className="text-primary" />
          <span className="font-medium">{product.category}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-muted bg-white/5 p-3 rounded-lg">
          <Calendar size={16} className="text-expiring" />
          <span className="font-medium">Expires: {new Date(product.expiryDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-text-muted mb-1 font-bold">Estimated Value</span>
          <span className="text-2xl font-bold font-['Outfit'] text-white">${product.price}</span>
        </div>
        <div className="flex items-center text-[#ec4899] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
          View Details
          <ChevronRight size={16} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
