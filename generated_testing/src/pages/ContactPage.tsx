import React from 'react';
    import ScrollAnimator from '@/components/ui/ScrollAnimator';
    import MultiStepForm from '@/features/forms/MultiStepForm';

    const ContactPage: React.FC = () => {
      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <ScrollAnimator>
            <h1 className="text-4xl font-bold text-center mb-4">Get In Touch</h1>
            <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? Fill out the form below, and I'll get back to you as soon as possible.
            </p>
          </ScrollAnimator>

          <ScrollAnimator delay={0.2}>
            <div className="max-w-2xl mx-auto p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-nebula-white dark:bg-deep-space-navy shadow-xl">
              <MultiStepForm />
            </div>
          </ScrollAnimator>
        </div>
      );
    };

    export default ContactPage;