import React from 'react';
    import { motion } from 'framer-motion';
    import { ExternalLink } from 'lucide-react';

    interface Project {
      id: string;
      title: string;
      description: string;
      tags: string[];
      type: string;
      year: number;
    }

    const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
      return (
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 h-full flex flex-col bg-white/5 dark:bg-gray-800/20 shadow-lg"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <a href="#" className="text-gray-400 hover:text-kinetic-teal transition-colors">
              <ExternalLink size={20} />
            </a>
          </div>
          <p className="text-gray-600 dark:text-gray-400 flex-grow mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs font-medium bg-kinetic-teal/20 text-kinetic-teal rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      );
    };

    export default ProjectCard;