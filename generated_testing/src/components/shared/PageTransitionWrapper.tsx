import React from 'react';
    import { motion } from 'framer-motion';

    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    };

    const PageTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => {
      return (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      );
    };

    export default PageTransitionWrapper;