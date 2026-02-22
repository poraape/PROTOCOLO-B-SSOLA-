import type { Icon } from 'lucide-react';
import { cn } from '../../services/cn'; // Assuming you have a utility for class names

interface DecisionButtonProps {
  label: string;
  subLabel?: string;
  icon?: Icon;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  isActive?: boolean;
  className?: string;
}

export const DecisionButton = ({
  label,
  subLabel,
  icon: Icon,
  onClick,
  variant = 'secondary',
  isActive = false,
  className,
}: DecisionButtonProps) => {
  const buttonClasses = cn(
    'decision-button',
    `decision-button--${variant}`,
    { 'decision-button--active': isActive },
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick}>
      {Icon && <Icon className="decision-button-icon" size={22} />}
      <div className="decision-button-text">
        <span className="decision-button-label">{label}</span>
        {subLabel && (
          <span className="decision-button-sublabel">{subLabel}</span>
        )}
      </div>
    </button>
  );
};
