import React from 'react';
import { SCHOOL_CONFIG } from '../content/schoolConfig';

type SchoolShieldProps = {
  className?: string;
  variant?: 'compact' | 'full';
};

export const SchoolShield: React.FC<SchoolShieldProps> = ({ className = '', variant = 'full' }) => {
  const isCompact = variant === 'compact';

  return (
    <header
      className={`flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-3 ${className}`.trim()}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-[18px] w-[18px] items-center justify-center text-base sm:h-[22px] sm:w-[22px] sm:text-lg" aria-hidden="true">
            🧭
          </span>
          <h1 className="truncate text-sm font-bold tracking-tight text-slate-900 sm:text-lg">{SCHOOL_CONFIG.appTitle}</h1>
        </div>

        {!isCompact ? (
          <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{SCHOOL_CONFIG.shortSubtitle}</p>
        ) : (
          <h2 className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">{SCHOOL_CONFIG.shortSubtitle}</h2>
        )}
      </div>

      <img
        src="/assets/logo-escola.png"
        alt="Logo da E.E. Ermelino Matarazzo"
        className="h-[40px] w-auto shrink-0 object-contain sm:h-[50px]"
      />
    </header>
  );
};

export default SchoolShield;
