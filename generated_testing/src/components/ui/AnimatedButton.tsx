import React from 'react';
    import { motion } from 'framer-motion';
    import { cn } from '@/lib/utils';
    import { Link } from 'react-router-dom';

    type AnimatedButtonProps = {
      children: React.ReactNode;
      as?: 'button' | 'a' | 'Link';
      to?: string;
    } & React.ButtonHTMLAttributes<HTMLButtonElement> &
      React.AnchorHTMLAttributes<HTMLAnchorElement>;

    const AnimatedButton = React.forwardRef<
      HTMLButtonElement | HTMLAnchorElement,
      AnimatedButtonProps
    >(({ children, as = 'button', className, to, ...props }, ref) => {
      const motionProps = {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      };

      const classes = cn(
        'px-6 py-3 font-semibold rounded-md transition-all duration-300',
        'bg-kinetic-teal text-deep-space-navy',
        'hover:bg-kinetic-teal/90',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kinetic-teal dark:focus:ring-offset-deep-space-navy',
        className
      );

      if (as === 'Link' && to) {
        return (
          <motion.div {...motionProps}>
            <Link to={to} className={classes}>
              {children}
            </Link>
          </motion.div>
        );
      }
      
      if (as === 'a') {
        return (
          <motion.a className={classes} {...motionProps} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} ref={ref as React.Ref<HTMLAnchorElement>}>
            {children}
          </motion.a>
        );
      }


      return (
        <motion.button className={classes} {...motionProps} {...props} ref={ref as React.Ref<HTMLButtonElement>}>
          {children}
        </motion.button>
      );
    });

    export default AnimatedButton;