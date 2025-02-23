
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StepsList } from '../components/StepsList';
import { FileExplorer } from '../components/FileExplorer';
import { TabView } from '../components/TabView';
import { CodeEditor } from '../components/CodeEditor';
import { PreviewFrame } from '../components/PreviewFrame';
import { Step, FileItem, StepType } from '../hooks/types';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { parseXml } from '../steps';
import { useWebContainer } from '../hooks/useWebContainer';
import { Loader } from '../components/Loader';
import { Sparkles, Code2, Eye } from 'lucide-react';


export function Builder() {
  const location = useLocation();
  const { prompt } = location.state as { prompt: string };
  const [userPrompt, setPrompt] = useState("");
  const [llmMessages, setLlmMessages] = useState<{role: "user" | "assistant", content: string;}[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [templateSet, setTemplateSet] = useState(false);
  const webcontainer = useWebContainer();

  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  
  const [steps, setSteps] = useState<Step[]>([]);

  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    let originalFiles = [...files];
    let updateHappened = false;
    steps.filter(({status}) => status === "pending").map(step => {
      updateHappened = true;
      if (step?.type === StepType.CreateFile) {
        let parsedPath = step.path?.split("/") ?? []; // ["src", "components", "App.tsx"]
        let currentFileStructure = [...originalFiles]; // {}
        let finalAnswerRef = currentFileStructure;
  
        let currentFolder = ""
        while(parsedPath.length) {
          currentFolder =  `${currentFolder}/${parsedPath[0]}`;
          let currentFolderName = parsedPath[0];
          parsedPath = parsedPath.slice(1);
  
          if (!parsedPath.length) {
            // final file
            let file = currentFileStructure.find(x => x.path === currentFolder)
            if (!file) {
              currentFileStructure.push({
                name: currentFolderName,
                type: 'file',
                path: currentFolder,
                content: step.code
              })
            } else {
              file.content = step.code;
            }
          } else {
            /// in a folder
            let folder = currentFileStructure.find(x => x.path === currentFolder)
            if (!folder) {
              // create the folder
              currentFileStructure.push({
                name: currentFolderName,
                type: 'folder',
                path: currentFolder,
                children: []
              })
            }
  
            currentFileStructure = currentFileStructure.find(x => x.path === currentFolder)!.children!;
          }
        }
        originalFiles = finalAnswerRef;
      }

    })

    if (updateHappened) {

      setFiles(originalFiles)
      setSteps(steps => steps.map((s: Step) => {
        return {
          ...s,
          status: "completed"
        }
        
      }))
    }
    //console.log(files);
  }, [steps, files]);

  useEffect(() => {
    const createMountStructure = (files: FileItem[]): Record<string, any> => {
      const mountStructure: Record<string, any> = {};
  
      const processFile = (file: FileItem, isRootFolder: boolean) => {  
        if (file.type === 'folder') {
          // For folders, create a directory entry
          mountStructure[file.name] = {
            directory: file.children ? 
              Object.fromEntries(
                file.children.map(child => [child.name, processFile(child, false)])
              ) 
              : {}
          };
        } else if (file.type === 'file') {
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: {
                contents: file.content || ''
              }
            };
          } else {
            // For files, create a file entry with contents
            return {
              file: {
                contents: file.content || ''
              }
            };
          }
        }
  
        return mountStructure[file.name];
      };
  
      // Process each top-level file/folder
      files.forEach(file => processFile(file, true));
  
      return mountStructure;
    };
  
    const mountStructure = createMountStructure(files);
  
    // Mount the structure if WebContainer is available
    console.log(mountStructure);
    webcontainer?.mount(mountStructure);
  }, [files, webcontainer]);

  async function init() {
    try {
      const response = await axios.post(`${BACKEND_URL}/template`, {
        prompt: prompt.trim()
      });
      setTemplateSet(true);
      
      const {prompts, uiPrompts} = response.data;

      setSteps(parseXml(uiPrompts[0]).map((x: Step) => ({
        ...x,
        status: "pending"
      })));

      setLoading(true);

      const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
        messages: [...prompts, prompt].map(content => ({
          role: "user",
          content
        }))
      });

      setLoading(false);

      setSteps(s => [...s, ...parseXml(stepsResponse.data.response).map(x => ({
        ...x,
        status: "pending" as "pending"
      }))]);

      setLlmMessages([...prompts, prompt].map(content => ({
        role: "user",
        content
      })));

      setLlmMessages(x => [...x, {role: "assistant", content: stepsResponse.data.response}]);
    } catch(error) {
      console.log("sorry we cannot generate the required website");
    } finally {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="flex flex-col items-center space-y-6">
            <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
            <div className="relative">
              <div className="w-16 h-16 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-200">Crafting your website...</h2>
            <p className="text-gray-400">Please wait while we process your request</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col transition-colors duration-500">
      <header className="bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600/50 px-6 py-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Site Crafter
          </h1>
          <span className="text-sm text-gray-400 ml-4">Prompt: {prompt}</span>
        </div>
      </header>
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-4 gap-6 p-6">
          <div className="col-span-1 space-y-6 overflow-auto transform transition-all duration-300 hover:scale-[1.01]">
            <div>
              <div className="max-h-[75vh] overflow-scroll rounded-xl bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700/50">
                <StepsList
                  steps={steps}
                  currentStep={currentStep}
                  onStepClick={setCurrentStep}
                />
              </div>
              <div className="mt-4">
                <div className='flex flex-col space-y-3'>
                  <br />
                  {(loading || !templateSet) && (
                    <div className="flex items-center justify-center p-4">
                      <Loader />
                    </div>
                  )}
                  {!(loading || !templateSet) && (
                    <div className='flex flex-col space-y-3'>
                      <textarea 
                        value={userPrompt} 
                        onChange={(e) => setPrompt(e.target.value)}
                        className='p-4 w-full bg-gray-800/50 rounded-xl border border-gray-700/50 text-gray-300 placeholder-gray-500 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300'
                        placeholder="Enter your next instruction..."
                      />
                      <button 
                        onClick={async () => {
                          if (!userPrompt.trim()) return;
                          
                          const newMessage = {
                            role: "user" as "user",
                            content: userPrompt
                          };

                          setLoading(true);
                          try {
                            const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
                              messages: [...llmMessages, newMessage]
                            });
                            
                            setLlmMessages(x => [...x, newMessage]);
                            setLlmMessages(x => [...x, {
                              role: "assistant",
                              content: stepsResponse.data.response
                            }]);
                            
                            setSteps(s => [...s, ...parseXml(stepsResponse.data.response).map(x => ({
                              ...x,
                              status: "pending" as "pending"
                            }))]);
                          } catch (error) {
                            console.error("Failed to generate response:", error);
                          } finally {
                            setLoading(false);
                          }
                        }} 
                        className='bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                        disabled={loading || !userPrompt.trim()}
                      >
                        Send Instruction
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 transform transition-all duration-300 hover:scale-[1.01]">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 h-full">
              <FileExplorer 
                files={files} 
                onFileSelect={setSelectedFile}
              />
            </div>
          </div>
          
          <div className="col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 p-4 h-[calc(100vh-8rem)] transform transition-all duration-300 hover:scale-[1.01]">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === 'code' 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Code</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === 'preview' 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
            </div>
            <div className="h-[calc(100%-4rem)]">
              {activeTab === 'code' ? (
                <CodeEditor file={selectedFile} />
              ) : (
                <PreviewFrame webContainer={webcontainer} files={files} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}