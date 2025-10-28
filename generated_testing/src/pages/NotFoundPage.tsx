import React from 'react';
    import { Link } from 'react-router-dom';
    import AnimatedButton from '@/components/ui/AnimatedButton';

    const NotFoundPage: React.FC = () => {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-9xl font-extrabold text-kinetic-teal">404</h1>
          <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sorry, the page you are looking for does not exist.
          </p>
          <div className="mt-8">
            <AnimatedButton as="Link" to="/">
              Go back home
            </AnimatedButton>
          </div>
        </div>
      );
    };

    export default NotFoundPage;