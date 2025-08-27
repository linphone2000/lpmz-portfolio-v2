'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-slate-300 border-t-sky-500 ${sizeClasses[size]} ${className}`} />
  );
};

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(50%_80%_at_50%_0%,rgba(79,195,247,0.18),transparent_60%),radial-gradient(60%_70%_at_100%_30%,rgba(2,119,189,0.12),transparent_60%),linear-gradient(180deg,#F8FAFC,transparent_40%)] text-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};
