require("dotenv").config();
import express from "express";
import { getSystemPrompt ,BASE_PROMPT } from './prompts';
import {reactprompt} from "./deafult/react";
import {nodeprompt} from "./deafult/node"
import cors from "cors";

import { HfInference } from "@huggingface/inference";

const client = new HfInference(process.env.hugging);

const { GoogleGenerativeAI } = require("@google/generative-ai");
const app=express();
app.use(express.json());
const systemPrompt = getSystemPrompt();
const genAI = new GoogleGenerativeAI(process.env.gemini);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: getSystemPrompt(),
  });

app.use(cors());

app.post("/template",async(req,res)=>{
    const prompt=req.body.prompt + "    Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra";
    const result = await model.generateContent(prompt);
    const response = (await result.response.text()).toLowerCase().trim(); // Ensure correct format
    
    if (response=='node'){
      res.json({
        prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactprompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
        
        uiPrompts: [reactprompt]
    })
     return;
    }
    if  (response=="react"){
        res.json({
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactprompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            
            uiPrompts: [reactprompt]
        })
        return;
       }
   
       res.status(403).json({message: "You cant access this"})
       return;
    
})

app.post("/chat", async (req, res) => {
  try {
    interface Message {
      role: string;
      content: string;
    }
    
    const messages = req.body.messages;

     // Map the messages to include roles and contents
    const chatMessages = [
      {
        role: "system",
        content: getSystemPrompt() ,
      },
      ...messages.map((msg:Message) => ({
        role: msg.role,
        content: msg.content ,
      })),
    ];

    // Perform chat completion with the new model and messages
    const chatCompletion = await client.chatCompletion({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      messages: chatMessages,
      max_tokens: 10000,
    });

    // Get the response content
    const responseContent = chatCompletion.choices[0].message.content;

    res.json({
      response: responseContent,
    });
  } catch (error) {
    console.error("Error processing chat request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
































app.listen("3000")

