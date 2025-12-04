import React from 'react';

interface CatAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'judge' | 'happy' | 'serious';
}

const CatAvatar: React.FC<CatAvatarProps> = ({ size = 'md', className = '', variant = 'judge' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  return (
    <div className={`rounded-full bg-orange-50 border-4 border-cat-brown shadow-xl relative overflow-hidden flex-shrink-0 ${sizeClasses[size]} ${className}`}>
      {/* Custom Cute SVG Cat */}
      <svg viewBox="0 0 100 100" className="w-full h-full transform translate-y-1">
        
        {/* Judge Wig Back */}
        {variant === 'judge' && (
          <g transform="translate(0, 5)">
            <path d="M15,55 Q10,65 15,75 Q20,85 28,80" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="1.5"/>
            <path d="M85,55 Q90,65 85,75 Q80,85 72,80" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="1.5"/>
            <circle cx="20" cy="60" r="6" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="1"/>
            <circle cx="20" cy="70" r="6" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="1"/>
            <circle cx="80" cy="60" r="6" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="1"/>
            <circle cx="80" cy="70" r="6" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="1"/>
          </g>
        )}

        {/* Ears */}
        <path d="M22,35 L12,12 L40,22" fill="#E6C29E" stroke="#5D4037" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M78,35 L88,12 L60,22" fill="#E6C29E" stroke="#5D4037" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M24,32 L18,18 L36,25" fill="#F4DCC4" />
        <path d="M76,32 L82,18 L64,25" fill="#F4DCC4" />

        {/* Face Shape */}
        <ellipse cx="50" cy="55" rx="38" ry="34" fill="#FDFBF7" stroke="#5D4037" strokeWidth="2"/>

        {/* Judge Wig Top */}
        {variant === 'judge' && (
          <g>
            <path d="M30,26 Q50,15 70,26" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="2" />
            <circle cx="35" cy="24" r="5" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="1"/>
            <circle cx="45" cy="21" r="5" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="1"/>
            <circle cx="55" cy="21" r="5" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="1"/>
            <circle cx="65" cy="24" r="5" fill="#EAEAEA" stroke="#D1D1D1" strokeWidth="1"/>
          </g>
        )}

        {/* Eyes */}
        <g className={variant === 'serious' ? '' : ''}>
           {variant === 'happy' ? (
             <>
               <path d="M35,50 Q40,45 45,50" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
               <path d="M55,50 Q60,45 65,50" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
             </>
           ) : (
             <>
               <circle cx="38" cy="52" r="5" fill="#333"/>
               <circle cx="62" cy="52" r="5" fill="#333"/>
               <circle cx="40" cy="50" r="1.5" fill="white"/>
               <circle cx="64" cy="50" r="1.5" fill="white"/>
             </>
           )}
        </g>
        
        {/* Blush */}
        <ellipse cx="28" cy="62" rx="4" ry="2" fill="#FFCDD2" opacity="0.6"/>
        <ellipse cx="72" cy="62" rx="4" ry="2" fill="#FFCDD2" opacity="0.6"/>

        {/* Judge Glasses */}
        {variant === 'judge' && (
          <g opacity="0.9">
            <circle cx="38" cy="54" r="10" fill="none" stroke="#5D4037" strokeWidth="1.5"/>
            <circle cx="62" cy="54" r="10" fill="none" stroke="#5D4037" strokeWidth="1.5"/>
            <line x1="48" y1="54" x2="52" y2="54" stroke="#5D4037" strokeWidth="1.5"/>
          </g>
        )}

        {/* Nose & Mouth */}
        <path d="M47,63 L53,63 L50,67 Z" fill="#E57373" stroke="#E57373" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M50,67 Q45,75 38,70" fill="none" stroke="#5D4037" strokeWidth="2" strokeLinecap="round"/>
        <path d="M50,67 Q55,75 62,70" fill="none" stroke="#5D4037" strokeWidth="2" strokeLinecap="round"/>

        {/* Gavel for Judge (Small icon in corner if needed, but keeping face clean is better) */}
      </svg>
    </div>
  );
};

export default CatAvatar;