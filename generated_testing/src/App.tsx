import React from 'react';
    import { Outlet } from 'react-router-dom';
    import { ThemeProvider } from '@/features/theme/ThemeProvider';
    import ToastManager from '@/components/shared/ToastManager';
    import ErrorBoundary from '@/components/shared/ErrorBoundary';

    function App() {
      return (
        <ErrorBoundary>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Outlet />
            <ToastManager />
          </ThemeProvider>
        </ErrorBoundary>
      );
    }

    export default App;