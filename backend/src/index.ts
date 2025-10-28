import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from 'express-session';
import passport from 'passport';
import { getSystemPrompt, BASE_PROMPT } from './prompts';
import { reactprompt } from "./deafult/react";
import { nodeprompt } from "./deafult/node";
import OpenAI from "openai";
import authRoutes from './routes/auth';
import googleAuthRoutes from './routes/googleAuth';
import './config/passport';
import { PlanningService } from './services/planning.service';

dotenv.config();

const app: Application = express();
const token = process.env.openai_api;

const client = new OpenAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  apiKey: process.env.gemini2
});

// Enhanced CORS configuration
app.use(cors({
  origin: true,
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless'); // Less restrictive
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups'); // Allows authentication flows
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.use(express.json());

// Session and Passport middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use('/auth', authRoutes);
app.use('/auth', googleAuthRoutes);

// Gemini AI setup
const { GoogleGenerativeAI } = require("@google/generative-ai");
const systemPrompt = getSystemPrompt();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// const genAI = new GoogleGenerativeAI(process.env.gemini);
// const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
//   systemInstruction: getSystemPrompt(),
// });

// Template endpoint
app.post("/template", async (req, res) => {
  const prompt = req.body.prompt + "    Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra";
  const result = await openai.chat.completions.create({
    model: "z-ai/glm-4.5-air:free",
    messages: [{ role: "user", content: prompt }],
    
  });
  const content=await result.choices[0].message.content;
  const response = content?.toLowerCase().trim();

  if (response === 'node') {
    res.json({
      prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeprompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [nodeprompt]
    });
    return;
  }
  if (response === "react") {
    res.json({
      prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactprompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [reactprompt]
    });
    return;
  }

  res.status(403).json({ message: "You cant access this" });
  return;
});

// Planning endpoint
app.post("/planning", async (req, res) => {
  try {
    const { requirements } = req.body;

    if (!requirements) {
      res.status(400).json({ 
        success: false, 
        error: 'Requirements are required' 
      });
      return;
    }

    const result = await PlanningService.generateBlueprint(requirements);
    res.json(result);

  } catch (error: any) {
    console.error('Planning route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    interface Message {
      role: string;
      content: string;
    }

    const messages = req.body.messages;
    const chatMessages = [
      { role: "system", content: getSystemPrompt() },
      ...messages.map((msg: Message) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];
    
    const response = await client.chat.completions.create({
      model: "gemini-2.5-pro",
      messages: chatMessages,
    });

    const responseContent = response.choices[0].message.content;
    console.log(responseContent);

    res.json({ response: responseContent });
  } catch (error) {
    console.error("Error processing chat request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is not defined in .env file.');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(3000, () => {
      console.log(` Server running on http://localhost:3000`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  });
