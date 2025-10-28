import React, { useEffect, useRef } from 'react';
    import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

    interface StatCounterProps {
      to: number;
      label: string;
      suffix?: string;
    }

    const StatCounter: React.FC<StatCounterProps> = ({ to, label, suffix = '' }) => {
      const ref = useRef<HTMLDivElement>(null);
      const motionValue = useMotionValue(0);
      const springValue = useSpring(motionValue, {
        damping: 100,
        stiffness: 100,
      });
      const isInView = useInView(ref, { once: true, margin: '-100px' });

      useEffect(() => {
        if (isInView) {
          motionValue.set(to);
        }
      }, [motionValue, isInView, to]);

      useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
          if (ref.current) {
            ref.current.textContent = `${Math.round(latest)}${suffix}`;
          }
        });
        return unsubscribe;
      }, [springValue, suffix]);

      return (
        <div>
          <h3 className="text-5xl font-bold text-kinetic-teal mb-2">
            <span ref={ref}>0</span>
          </h3>
          <p className="text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      );
    };

    export default StatCounter;