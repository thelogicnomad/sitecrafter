import { Suspense, lazy } from 'react';
    import { Routes, Route, useLocation } from 'react-router-dom';
    import { AnimatePresence } from 'framer-motion';
    import LayoutShell from '@/components/layout/LayoutShell';
    
    const HomePage = lazy(() => import('@/pages/HomePage'));
    const CatalogPage = lazy(() => import('@/pages/CatalogPage'));
    const CakeBuilderPage = lazy(() => import('@/pages/CakeBuilderPage'));
    const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
    
    function App() {
      const location = useLocation();
    
      return (
        <LayoutShell>
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/build" element={<CakeBuilderPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </LayoutShell>
      );
    }
    
    export default App;