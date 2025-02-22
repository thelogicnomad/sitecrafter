import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Contact from '../components/Contact';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section id="home" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
              Welcome to <span className="text-yellow-400">SiteCrafter</span>
              <br />
              Bring your Vision to Life
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Create stunning websites that turn visitors into customers with our AI-powered platform
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80",
              "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
              "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            ].map((url, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-500 hover:scale-105 ${
                  index === 1 ? 'md:translate-y-8' : ''
                }`}
              >
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-xl hover:shadow-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <About />
      <Contact />
    </div>
  );
};

export default Home;