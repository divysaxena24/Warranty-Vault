import React from 'react';

const StatusBadge = ({ status }) => {
  const getStyles = () => {
    switch (status?.toLowerCase()) {
      case 'active': 
        return 'bg-active/20 text-active border-active/20';
      case 'expired': 
        return 'bg-expired/20 text-expired border-expired/20';
      case 'expiring soon': 
        return 'bg-expiring/20 text-expiring border-expiring/20';
      default: 
        return 'bg-white/10 text-white/60 border-white/10';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;

