import React from 'react';
    import { ArrowRight } from 'lucide-react';
    import AnimatedButton from '@/components/ui/AnimatedButton';
    import ScrollAnimator from '@/components/ui/ScrollAnimator';
    import ThreeJSGlobe from '@/features/visuals/ThreeJSGlobe';
    import StatCounter from '@/features/charts/StatCounter';

    const HomePage: React.FC = () => {
      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <ScrollAnimator>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                Crafting Digital Experiences That Matter
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                I'm a full-stack developer specializing in building exceptional web applications. I turn complex problems into elegant, user-friendly solutions.
              </p>
              <AnimatedButton as="Link" to="/projects">
                View My Work <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </ScrollAnimator>
            <ScrollAnimator delay={0.2}>
              <ThreeJSGlobe />
            </ScrollAnimator>
          </section>

          <section className="py-24">
            <ScrollAnimator>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <StatCounter to={5} label="Years of Experience" />
                <StatCounter to={42} label="Projects Completed" />
                <StatCounter to={99} label="Client Satisfaction" suffix="%" />
              </div>
            </ScrollAnimator>
          </section>
        </div>
      );
    };

    export default HomePage;