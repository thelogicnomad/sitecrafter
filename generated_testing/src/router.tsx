import React, { lazy, Suspense } from 'react';
    import { createBrowserRouter } from 'react-router-dom';
    import App from '@/App';
    import LayoutShell from '@/components/layout/LayoutShell';
    import { Code } from 'lucide-react';

    const HomePage = lazy(() => import('@/pages/HomePage'));
    const AboutPage = lazy(() => import('@/pages/AboutPage'));
    const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
    const ContactPage = lazy(() => import('@/pages/ContactPage'));
    const BlogPage = lazy(() => import('@/pages/BlogPage'));
    const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

    const LoadingFallback = () => (
      <div className="w-full h-screen flex items-center justify-center bg-deep-space-navy">
        <Code className="text-kinetic-teal animate-pulse" size={48} />
      </div>
    );

    export const router = createBrowserRouter([
      {
        path: '/',
        element: <App />,
        children: [
          {
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <LayoutShell />
              </Suspense>
            ),
            errorElement: <NotFoundPage />,
            children: [
              { index: true, element: <HomePage /> },
              { path: 'about', element: <AboutPage /> },
              { path: 'projects', element: <ProjectsPage /> },
              { path: 'contact', element: <ContactPage /> },
              { path: 'blog', element: <BlogPage /> },
            ],
          },
        ],
        errorElement: <NotFoundPage />,
      },
    ]);