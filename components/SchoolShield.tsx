
import React from 'react';

export const SchoolShield: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 200 240" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Sombra externa */}
    <path 
      d="M100 230C100 230 185 180 185 85V30L100 10L15 30V85C15 180 100 230 100 230Z" 
      fill="black" 
      fillOpacity="0.2"
      transform="translate(4, 4)"
    />
    {/* Contorno Preto */}
    <path 
      d="M100 230C100 230 185 180 185 85V30L100 10L15 30V85C15 180 100 230 100 230Z" 
      fill="black"
    />
    {/* Fundo Amarelo */}
    <path 
      d="M100 222C100 222 177 176 177 88V38L100 20L23 38V88C23 176 100 222 100 222Z" 
      fill="#FACC15"
    />
    
    {/* Letras "EM" Estilizadas */}
    <text 
      x="100" 
      y="135" 
      fill="black" 
      fontSize="110" 
      fontWeight="900" 
      textAnchor="middle" 
      style={{ fontFamily: 'serif', letterSpacing: '-5px' }}
    >
      EM
    </text>

    {/* Faixa Preta Central */}
    <path 
      d="M15 105C15 105 100 85 185 105V125C185 125 100 105 15 125V105Z" 
      fill="black"
    />
    
    {/* Nome da Escola na Faixa */}
    <text 
      x="100" 
      y="118" 
      fill="white" 
      fontSize="11" 
      fontWeight="900" 
      textAnchor="middle" 
      style={{ letterSpacing: '0.5px' }}
    >
      ERMELINO MATARAZZO
    </text>
  </svg>
);
