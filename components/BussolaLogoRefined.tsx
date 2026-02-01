
import React from 'react';

export const BussolaLogoRefined: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <div className={`${className} relative group animate-in zoom-in duration-700`}>
    {/* Sombras de Profundidade */}
    <div className="absolute inset-0 bg-slate-400/20 dark:bg-black/40 rounded-full blur-2xl transform translate-y-4 scale-90"></div>
    
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-full h-full drop-shadow-2xl">
      {/* Corpo Principal - Efeito Vidro */}
      <circle cx="100" cy="100" r="90" fill="url(#glass_gradient)" stroke="url(#border_gradient)" strokeWidth="1.5" />
      
      {/* Marcas de Orientação (360 graus) */}
      <g opacity="0.4">
        {[...Array(12)].map((_, i) => (
          <rect 
            key={i} 
            x="99.2" y="15" width="1.6" height="8" 
            rx="0.8" 
            transform={`rotate(${i * 30} 100 100)`} 
            className="fill-slate-400 dark:fill-slate-500"
          />
        ))}
      </g>

      {/* Anel Interno Decorativo */}
      <circle cx="100" cy="100" r="70" stroke="url(#inner_ring_gradient)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5" />

      {/* A AGULHA (Orientação + Acolhimento) */}
      <g className="transition-transform duration-1000 group-hover:rotate-[360deg] origin-center">
        {/* Sombra da Agulha */}
        <path d="M100 40L115 100L100 160L85 100L100 40Z" fill="black" fillOpacity="0.1" transform="translate(2, 4)" />
        
        {/* Norte (Orientação) */}
        <path d="M100 40L115 100H85L100 40Z" fill="url(#needle_north)" />
        
        {/* Sul */}
        <path d="M100 160L85 100H115L100 160Z" fill="url(#needle_south)" />

        {/* O CORAÇÃO NO CENTRO (Acolhimento) */}
        <path 
          d="M100 108C100 108 94 104 94 99.5C94 97 96 95 98.5 95C99.5 95 100 95.5 100 95.5C100 95.5 100.5 95 101.5 95C104 95 106 97 106 99.5C106 104 100 108 100 108Z" 
          fill="#FF3B30" 
          className="drop-shadow-[0_0_8px_rgba(255,59,48,0.6)]"
        />
        
        {/* Brilho da Agulha */}
        <path d="M100 45L108 100H100V45Z" fill="white" fillOpacity="0.2" />
      </g>

      {/* Reflexo de Vidro Superior */}
      <path 
        d="M40 40C60 25 140 25 160 40" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeOpacity="0.3" 
      />

      {/* Definições de Gradientes */}
      <defs>
        <linearGradient id="glass_gradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.9" className="dark:stop-slate-800" />
          <stop offset="1" stopColor="#F8FAFC" stopOpacity="0.6" className="dark:stop-slate-900" />
        </linearGradient>
        
        <linearGradient id="border_gradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E2E8F0" />
          <stop offset="0.5" stopColor="white" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>

        <linearGradient id="inner_ring_gradient" x1="100" y1="30" x2="100" y2="170" gradientUnits="userSpaceOnUse">
          <stop stopColor="#94A3B8" />
          <stop offset="1" stopColor="#475569" />
        </linearGradient>

        <linearGradient id="needle_north" x1="100" y1="40" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E293B" className="dark:stop-white" />
          <stop offset="1" stopColor="#475569" className="dark:stop-slate-300" />
        </linearGradient>

        <linearGradient id="needle_south" x1="100" y1="100" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CBD5E1" className="dark:stop-slate-600" />
          <stop offset="1" stopColor="#94A3B8" className="dark:stop-slate-800" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);
