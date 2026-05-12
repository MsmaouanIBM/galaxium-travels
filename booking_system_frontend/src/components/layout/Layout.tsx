import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Starfield } from '../common/Starfield';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative bg-carbon-background">
      {/* Animated starfield background - keeping for visual interest */}
      <Starfield />
      
      {/* Toast notifications - Carbon themed */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#262626',
            color: '#f4f4f4',
            border: '1px solid #393939',
          },
          success: {
            iconTheme: {
              primary: '#42be65',
              secondary: '#f4f4f4',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff8389',
              secondary: '#f4f4f4',
            },
          },
        }}
      />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main className="relative z-10 flex-1 pt-24 pb-8">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Made with Bob - IBM Carbon Design System
