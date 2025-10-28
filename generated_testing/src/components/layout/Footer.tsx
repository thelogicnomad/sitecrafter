import React from 'react';
    import { Github, Linkedin, Twitter } from 'lucide-react';

    const Footer: React.FC = () => {
      const socialLinks = [
        { icon: Github, href: '#', label: 'Github' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Twitter, href: '#', label: 'Twitter' },
      ];

      return (
        <footer className="bg-nebula-white/50 dark:bg-deep-space-navy/50 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} John Doe. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-kinetic-teal transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;