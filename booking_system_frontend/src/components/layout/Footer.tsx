import { Github, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-carbon-border-subtle bg-carbon-ui-background">
      <div className="container mx-auto px-4 py-06">
        <div className="flex flex-col md:flex-row items-center justify-between gap-04">
          {/* Copyright */}
          <div className="text-carbon-text-secondary text-sm">
            © {currentYear} Galaxium Travels. All rights reserved.
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-02 text-carbon-text-secondary text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-carbon-support-error fill-carbon-support-error" />
            <span>for space travelers</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-04">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-carbon-text-secondary hover:text-carbon-interactive transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
        
        {/* Team Credit */}
        <div className="mt-04 text-center">
          <div className="text-carbon-text-secondary text-sm">
            Built by <span className="text-carbon-interactive font-semibold">TrueNorth AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Made with Bob - IBM Carbon Design System
