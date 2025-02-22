import React from 'react';
import { Send, User, Mail, MessageSquare } from 'lucide-react';

const InputField = ({ 
  label, 
  icon: Icon, 
  type = 'text', 
  placeholder 
}: {
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder: string;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
      <Icon className="w-4 h-4 text-gray-600" />
      <span>{label}</span>
    </label>
    {type === 'textarea' ? (
      <textarea
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 outline-none resize-none h-24"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 outline-none"
      />
    )}
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="py-16 px-6 md:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Get in Touch</h2>
          <p className="text-gray-600">We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              alt="Contact"
              className="rounded-xl shadow-xl"
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
            <InputField 
              label="NAME"
              icon={User}
              placeholder="John Doe"
            />
            <InputField 
              label="EMAIL"
              icon={Mail}
              type="email"
              placeholder="john@example.com"
            />
            <InputField 
              label="MESSAGE"
              icon={MessageSquare}
              type="textarea"
              placeholder="Your message here..."
            />
            <button className="w-full bg-gray-900 text-white rounded-lg py-3 flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg">
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;