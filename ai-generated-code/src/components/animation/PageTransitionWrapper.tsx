import { motion } from 'framer-motion';
    import React from 'react';
    
    const pageVariants = {
      initial: {
        opacity: 0,
        scale: 0.98,
      },
      in: {
        opacity: 1,
        scale: 1,
      },
      out: {
        opacity: 0,
        scale: 1.02,
      },
    };
    
    const pageTransition = {
      type: 'tween',
      ease: 'anticipate',
      duration: 0.4,
    };
    
    const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
      return (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </motion.div>
      );
    };
    
    export default PageTransitionWrapper;