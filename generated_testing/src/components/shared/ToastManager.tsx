import { Toaster } from 'sonner';
    import { useTheme } from '@/features/theme/useTheme';

    const ToastManager = () => {
      const { theme } = useTheme();
      return <Toaster theme={theme as 'light' | 'dark'} richColors />;
    };

    export default ToastManager;