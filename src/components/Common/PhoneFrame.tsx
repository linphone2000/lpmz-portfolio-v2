'use client';

import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
  showHoverEffect?: boolean;
  onClick?: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = React.memo(({
  src,
  alt,
  className = '',
  showHoverEffect = true,
  onClick
}) => {
  return (
    <div className={`relative group ${className}`}>
      <div 
        className={`w-full overflow-hidden bg-neutral-900 rounded-2xl p-1 shadow-xl hover:shadow-lg transition-all duration-300 ${
          onClick ? 'cursor-pointer' : ''
        }`}
        onClick={onClick}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-2xl object-contain"
        />
        {/* Overlay on hover */}
        {showHoverEffect && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center rounded-2xl">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PhotoIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

PhoneFrame.displayName = 'PhoneFrame';
