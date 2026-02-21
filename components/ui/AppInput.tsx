import React from 'react';

type AppInputProps = {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'search' | 'email' | 'tel';
  className?: string;
};

export const AppInput: React.FC<AppInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  className = ''
}) => {
  return (
    <label htmlFor={id} className={`ui-input-wrap ${className}`.trim()}>
      <span className="ui-input-label">{label}</span>
      <input
        id={id}
        type={type}
        className="ui-input"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  );
};
