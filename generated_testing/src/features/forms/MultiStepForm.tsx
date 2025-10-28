import React, { useState } from 'react';
    import { useForm, FormProvider } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { AnimatePresence, motion } from 'framer-motion';
    import { toast } from 'sonner';
    import AnimatedButton from '@/components/ui/AnimatedButton';
    import { CheckCircle } from 'lucide-react';
    
    // Zod Schemas for each step
    const step1Schema = z.object({
      name: z.string().min(2, 'Name is too short'),
      email: z.string().email('Invalid email address'),
    });
    
    const step2Schema = z.object({
      message: z.string().min(10, 'Message should be at least 10 characters'),
    });
    
    const formSchema = step1Schema.merge(step2Schema);
    type FormData = z.infer<typeof formSchema>;

    const steps = [
      { id: 'Step 1', name: 'Your Info', fields: ['name', 'email'] },
      { id: 'Step 2', name: 'Your Message', fields: ['message'] },
      { id: 'Step 3', name: 'Confirmation' },
    ];
    
    const FormInput = ({ name, label, type = 'text', register, errors }: any) => (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
        <input
          id={name}
          type={type}
          {...register(name)}
          className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-kinetic-teal focus:outline-none"
        />
        {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
      </div>
    );
    
    const MultiStepForm: React.FC = () => {
      const [currentStep, setCurrentStep] = useState(0);
      const [isSubmitted, setIsSubmitted] = useState(false);
      const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
      });
      const { register, handleSubmit, trigger, formState: { errors } } = methods;

      const processForm = async (data: FormData) => {
        console.log('Form data:', data);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Message sent successfully!');
        setIsSubmitted(true);
      };
      
      const next = async () => {
        const fields = steps[currentStep].fields;
        const output = await trigger(fields as any, { shouldFocus: true });
        if (!output) return;
        if (currentStep < steps.length - 1) {
          setCurrentStep(step => step + 1);
        }
      };

      const prev = () => {
        if (currentStep > 0) {
          setCurrentStep(step => step - 1);
        }
      };
    
      if (isSubmitted) {
        return (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64}/>
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Your message has been sent. I'll be in touch soon.</p>
          </motion.div>
        );
      }
    
      return (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(processForm)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Your Information</h2>
                    <FormInput name="name" label="Name" register={register} errors={errors} />
                    <FormInput name="email" label="Email" type="email" register={register} errors={errors} />
                  </div>
                )}
                {currentStep === 1 && (
                   <div>
                    <h2 className="text-xl font-semibold mb-4">Your Message</h2>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register("message")}
                        className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-kinetic-teal focus:outline-none"
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
    
            <div className="mt-6 flex justify-between">
              <AnimatedButton type="button" onClick={prev} disabled={currentStep === 0} className="disabled:opacity-50">
                Back
              </AnimatedButton>
              {currentStep < steps.length - 2 ? (
                <AnimatedButton type="button" onClick={next}>Next</AnimatedButton>
              ) : (
                <AnimatedButton type="submit">Submit</AnimatedButton>
              )}
            </div>
          </form>
        </FormProvider>
      );
    };

    export default MultiStepForm;