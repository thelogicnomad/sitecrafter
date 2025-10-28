import React, { useState } from 'react';
    import { NavLink } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Code, Sun, Moon, Menu, X } from 'lucide-react';
    import { useTheme } from '@/features/theme/useTheme';
    import { cn } from '@/lib/utils';

    const navLinks = [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About' },
      { path: '/projects', label: 'Projects' },
      { path: '/contact', label: 'Contact' },
    ];

    const HeaderNav: React.FC = () => {
      const { theme, setTheme } = useTheme();
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

      const itemVariants = {
        closed: { opacity: 0, y: -10 },
        open: { opacity: 1, y: 0 },
      };
      
      const NavItems = () => (
        <>
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'relative px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'text-kinetic-teal'
                    : 'hover:text-kinetic-teal'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-kinetic-teal"
                      layoutId="underline"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </>
      );

      return (
        <header className="sticky top-0 z-50 bg-nebula-white/80 dark:bg-deep-space-navy/80 backdrop-blur-sm">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
                <Code className="h-8 w-8 text-kinetic-teal" />
                <span className="font-bold text-lg">John Doe</span>
              </NavLink>

              <div className="hidden md:flex items-center space-x-4">
                <NavItems />
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="md:hidden">
                   <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            </div>
            {/* Mobile Menu */}
            <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden flex flex-col items-center space-y-4 py-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NavItems />
              </motion.div>
            )}
            </AnimatePresence>
          </nav>
        </header>
      );
    };

    export default HeaderNav;