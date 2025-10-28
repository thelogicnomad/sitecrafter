import React from 'react';
    import ScrollAnimator from '@/components/ui/ScrollAnimator';
    import SkillRadarChart from '@/features/charts/SkillRadarChart';

    const AboutPage: React.FC = () => {
      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ScrollAnimator>
            <h1 className="text-4xl font-bold text-center mb-12">About Me</h1>
          </ScrollAnimator>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollAnimator>
              <img
                src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop"
                alt="John Doe"
                className="rounded-lg shadow-2xl"
              />
            </ScrollAnimator>
            <ScrollAnimator delay={0.2}>
              <h2 className="text-3xl font-semibold mb-4">A Passion for Building</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Hello! I'm John, a developer with a knack for creating beautiful and functional web experiences. My journey into code started years ago, and since then, I've been obsessed with building things for the web.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                I thrive on challenges and am constantly learning new technologies to stay at the forefront of web development. My goal is to not just write code, but to build products that are performant, accessible, and delightful to use.
              </p>
            </ScrollAnimator>
          </div>

          <ScrollAnimator>
            <section className="py-24">
              <h2 className="text-3xl font-bold text-center mb-8">My Skillset</h2>
              <div className="max-w-2xl mx-auto">
                <SkillRadarChart />
              </div>
            </section>
          </ScrollAnimator>
        </div>
      );
    };

    export default AboutPage;