import PageTransitionWrapper from '@/components/animation/PageTransitionWrapper';
    import { Link } from 'react-router-dom';

    const HomePage = () => {
      return (
        <PageTransitionWrapper>
          <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559620192-032c4bc4674e?q=80&w=1920&auto=format&fit=crop)' }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
    
            <div className="relative z-10 text-center text-white p-8">
              <h1 className="text-5xl md:text-7xl font-black mb-4 text-shadow-lg">Craft Your Dream Cake</h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">From elegant wedding tiers to whimsical birthday creations, every cake is a masterpiece waiting to happen.</p>
              <div className="flex justify-center gap-4">
                <Link to="/build" className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-transform hover:scale-105">
                  Start Building
                </Link>
                <Link to="/catalog" className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-transform hover:scale-105">
                  View Designs
                </Link>
              </div>
            </div>
          </div>
        </PageTransitionWrapper>
      );
    };
    
    export default HomePage;