import React from 'react';
    import HeaderNav from '@/components/layout/HeaderNav';
    import CustomCursor from '@/components/ui/CustomCursor';
    import { GlobalStateProvider } from '@/state/GlobalStateContext';
    
    const LayoutShell = ({ children }: { children: React.ReactNode }) => {
      return (
        <GlobalStateProvider>
          <CustomCursor />
          <div className="relative z-10">
            <HeaderNav />
            <main>{children}</main>
          </div>
        </GlobalStateProvider>
      );
    };
    
    export default LayoutShell;