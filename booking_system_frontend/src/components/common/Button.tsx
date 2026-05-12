import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) => {
  const baseClasses = 'font-normal transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-carbon-focus focus:ring-offset-2 focus:ring-offset-carbon-background';
  
  const variantClasses = {
    primary: 'bg-carbon-interactive text-carbon-text-on-color hover:bg-carbon-interactive-hover',
    secondary: 'bg-transparent text-carbon-text-primary border border-carbon-interactive hover:bg-carbon-interactive hover:text-carbon-text-on-color',
    tertiary: 'bg-transparent text-carbon-interactive hover:bg-carbon-layer-02',
    danger: 'bg-carbon-support-error text-carbon-text-on-color hover:bg-red-600',
  };
  
  const sizeClasses = {
    sm: 'py-02 px-04 text-sm',
    md: 'py-03 px-05 text-base',
    lg: 'py-04 px-06 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.99 }}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

// Made with Bob - IBM Carbon Design System
