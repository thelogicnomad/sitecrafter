import React, { useRef } from 'react';
    import { motion, useInView } from 'framer-motion';

    interface ScrollAnimatorProps {
      children: React.ReactNode;
      className?: string;
      delay?: number;
    }

    const ScrollAnimator: React.FC<ScrollAnimatorProps> = ({
      children,
      className,
      delay = 0,
    }) => {
      const ref = useRef(null);
      const isInView = useInView(ref, { once: true, amount: 0.3 });

      const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      };

      return (
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className={className}
        >
          {children}
        </motion.div>
      );
    };

    export default ScrollAnimator;