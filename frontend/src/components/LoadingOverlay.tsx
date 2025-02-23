import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = ({ message }: { message: string }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center space-y-4 max-w-sm mx-4">
        <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
        <p className="text-gray-800 text-center font-medium">{message}</p>
        <p className="text-sm text-gray-600 text-center">
          First-time requests may take up to a minute while our server warms up.
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;