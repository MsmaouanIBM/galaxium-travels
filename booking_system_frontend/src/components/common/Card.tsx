import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card = ({ children, className, hover = false, onClick }: CardProps) => {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      className={clsx(
        'carbon-card p-05',
        hover && 'hover:bg-carbon-layer-02 cursor-pointer transition-colors duration-150',
        onClick && 'w-full text-left',
        className
      )}
      whileHover={hover ? { scale: 1.01 } : undefined}
      transition={{ duration: 0.15 }}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

// Made with Bob - IBM Carbon Design System
