import React from 'react';
    import { Outlet, useLocation } from 'react-router-dom';
    import { AnimatePresence } from 'framer-motion';
    import HeaderNav from '@/components/layout/HeaderNav';
    import Footer from '@/components/layout/Footer';
    import PageTransitionWrapper from '@/components/shared/PageTransitionWrapper';

    const LayoutShell: React.FC = () => {
      const location = useLocation();

      return (
        <div className="flex flex-col min-h-screen">
          <HeaderNav />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <PageTransitionWrapper key={location.pathname}>
                <Outlet />
              </PageTransitionWrapper>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      );
    };

    export default LayoutShell;