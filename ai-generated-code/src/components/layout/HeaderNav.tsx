import { useContext } from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Cake, ShoppingCart, User } from 'lucide-react';
    import { GlobalStateContext } from '@/state/GlobalStateContext';
    
    const HeaderNav = () => {
      const { state } = useContext(GlobalStateContext);
      const cartItemCount = state.cart.length;
    
      return (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm"
        >
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold font-serif text-primary">
              <Cake className="w-6 h-6" />
              Bespoke
            </Link>
            <div className="hidden md:flex items-center gap-8 font-medium">
              <Link to="/catalog" className="hover:text-primary transition-colors">Catalog</Link>
              <Link to="/build" className="hover:text-primary transition-colors">Build a Cake</Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </button>
              <Link to="/checkout" className="relative p-2 hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-primary text-white text-xs text-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </motion.header>
      );
    };
    
    export default HeaderNav;