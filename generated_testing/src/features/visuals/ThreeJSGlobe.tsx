import React from 'react';
    import { motion } from 'framer-motion';
    import { Code, Database, Cloudy } from 'lucide-react';

    // This is a mock component to represent a 3D globe without installing Three.js
    const ThreeJSGlobe: React.FC = () => {
      return (
        <div className="relative w-full aspect-square max-w-lg mx-auto">
          <motion.div
            className="w-full h-full rounded-full border-2 border-kinetic-teal/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {/* Main Orbit */}
          </motion.div>
          
          <motion.div 
            className="absolute top-0 left-0 w-full h-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {/* Inner orbit */}
            <div className="absolute top-1/2 left-1/2 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-kinetic-teal/20" />
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Code className="text-kinetic-teal" size={48} />
          </div>
          
          {/* Orbiting Icons */}
          <motion.div
            className="absolute"
            style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="absolute" style={{ top: '-100px' }}>
              <Database className="text-nebula-white" />
            </div>
          </motion.div>
          <motion.div
            className="absolute"
            style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
              delay: 5
            }}
          >
            <div className="absolute" style={{ right: '-150px' }}>
              <Cloudy className="text-nebula-white" />
            </div>
          </motion.div>
        </div>
      );
    };

    export default ThreeJSGlobe;