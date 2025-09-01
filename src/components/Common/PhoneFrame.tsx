'use client';

import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
  showHoverEffect?: boolean;
  onClick?: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = React.memo(
  ({ src, alt, className = '', showHoverEffect = true, onClick }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div className={`relative group ${className}`}>
        <div
          className={`w-full overflow-hidden bg-neutral-900 rounded-2xl p-1 shadow-xl hover:shadow-lg transition-all duration-300 ${
            onClick ? 'cursor-pointer' : ''
          }`}
          onClick={onClick}
                 >
           <div className="relative w-full h-full rounded-2xl overflow-hidden">
             <Image
               src={src}
               alt={alt}
               width={300}
               height={600}
               className="w-full h-full object-contain"
               onLoad={() => setIsLoading(false)}
               onError={() => setIsLoading(false)}
             />
             
             {/* Loading state overlay */}
             {isLoading && (
               <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                 <div className="text-center">
                   <PhotoIcon className="w-8 h-8 text-neutral-400 dark:text-neutral-500 mx-auto mb-2" />
                   <div className="text-xs text-neutral-400 dark:text-neutral-500">
                     Loading...
                   </div>
                 </div>
               </div>
             )}
           </div>
          
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
  }
);

PhoneFrame.displayName = 'PhoneFrame';
