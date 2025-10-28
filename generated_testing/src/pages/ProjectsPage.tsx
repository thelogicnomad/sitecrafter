import React from 'react';
    import ProjectSearchBar from '@/features/search/ProjectSearchBar';
    import ScrollAnimator from '@/components/ui/ScrollAnimator';
    import { mockProjectData } from '@/features/data/MockData';
    import ProjectCard from '@/features/projects/ProjectCard';

    const ProjectsPage: React.FC = () => {
      // In a real app, state would be managed here for filtering/searching
      const [projects] = React.useState(mockProjectData);

      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ScrollAnimator>
            <h1 className="text-4xl font-bold text-center mb-4">My Work</h1>
            <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Here's a selection of projects I've worked on. Feel free to explore and see the code behind them.
            </p>
          </ScrollAnimator>

          <ProjectSearchBar />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projects.map((project, index) => (
              <ScrollAnimator key={project.id} delay={index * 0.1}>
                <ProjectCard project={project} />
              </ScrollAnimator>
            ))}
          </div>
        </div>
      );
    };

    export default ProjectsPage;