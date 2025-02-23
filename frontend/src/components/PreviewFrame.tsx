import { WebContainer } from '@webcontainer/api';
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

interface PreviewFrameProps {
  files: any[];
  webContainer: WebContainer | undefined;
}

export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    let serverProcess: any = null;

    async function startDevServer() {
      if (!webContainer) return;
      
      try {
        setIsLoading(true);
        setError("");

        // Kill any existing process
        if (serverProcess) {
          try {
            await serverProcess.kill();
          } catch (e) {
            console.log("No previous process to kill");
          }
        }

        // Install dependencies
        const installProcess = await webContainer.spawn('npm', ['install']);
        await installProcess.exit;

        // Start dev server
        serverProcess = await webContainer.spawn('npm', ['run', 'dev']);
        
        // Handle server output
        serverProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log(data);
            }
          })
        );

        // Listen for server ready event
        webContainer.on('server-ready', (port, serverUrl) => {
          if (isMounted) {
            console.log('Server is ready on port:', port);
            setUrl(serverUrl);
            setIsLoading(false);
          }
        });

      } catch (err) {
        console.error('Error starting dev server:', err);
        if (isMounted) {
          setError("Failed to start preview server. Please try again.");
          setIsLoading(false);
        }
      }
    }

    startDevServer();

    // Cleanup function
    return () => {
      isMounted = false;
      if (serverProcess) {
        serverProcess.kill().catch(console.error);
      }
    };
  }, [webContainer]); // Only re-run when webContainer changes

  if (!webContainer) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="mb-2">Initializing WebContainer...</p>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-400">
        <div className="text-center">
          <p className="mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="text-center">
            <Loader />
            <p className="mt-4 text-gray-300">Starting preview server...</p>
          </div>
        </div>
      )}
      {url && (
        <iframe 
          src={url}
          className="w-full h-full border-0 rounded-lg"
          title="Preview"
        />
      )}
    </div>
  );
}