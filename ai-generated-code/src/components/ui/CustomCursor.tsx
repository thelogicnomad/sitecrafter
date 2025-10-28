import { motion, useMotionValue, useSpring } from 'framer-motion';
    import { useEffect } from 'react';
    
    const CustomCursor = () => {
      const cursorX = useMotionValue(-100);
      const cursorY = useMotionValue(-100);
    
      const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
      const cursorXSpring = useSpring(cursorX, springConfig);
      const cursorYSpring = useSpring(cursorY, springConfig);
    
      useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
          cursorX.set(e.clientX - 8);
          cursorY.set(e.clientY - 8);
        };
    
        window.addEventListener('mousemove', moveCursor);
        document.body.style.cursor = 'none';
    
        return () => {
          window.removeEventListener('mousemove', moveCursor);
          document.body.style.cursor = 'auto';
        };
      }, [cursorX, cursorY]);
    
      return (
        <motion.div
          className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999]"
          style={{
            translateX: cursorXSpring,
            translateY: cursorYSpring,
          }}
        />
      );
    };
    
    export default CustomCursor;