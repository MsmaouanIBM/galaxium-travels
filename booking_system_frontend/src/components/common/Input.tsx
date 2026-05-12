import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = ({ label, error, helperText, className, ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="label">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'input-field',
          error && 'border-carbon-support-error focus:border-carbon-support-error',
          className
        )}
        {...props}
      />
      {error && (
        <p className="error-text">{error}</p>
      )}
      {helperText && !error && (
        <p className="helper-text">{helperText}</p>
      )}
    </div>
  );
};

// Made with Bob - IBM Carbon Design System
