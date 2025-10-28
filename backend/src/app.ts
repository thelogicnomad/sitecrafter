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

dotenv.config();

const app: Application = express();
const token = process.env.openai_api;

const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: token
});

// Enhanced CORS configuration
app.use(cors({
  origin: true,
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
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

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Gemini AI setup
const { GoogleGenerativeAI } = require("@google/generative-ai");
const systemPrompt = getSystemPrompt();
const genAI = new GoogleGenerativeAI(process.env.gemini);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: getSystemPrompt(),
});

// Template endpoint
app.post("/template", async (req, res) => {
  const prompt = req.body.prompt + "    Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra";
  const result = await model.generateContent(prompt);
  const response = (await result.response.text()).toLowerCase().trim();

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
      model: "gpt-4.1",
      messages: chatMessages,
    });

    const responseContent = response.choices[0].message.content;
    res.json({ response: responseContent });
  } catch (error) {
    console.error("Error processing chat request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// MongoDB Connection – reuse between invocations
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is not defined in .env file.');
} else if (mongoose.connection.readyState === 0) {
  mongoose.connect(mongoUri).catch(err => {
    console.error('MongoDB connection error:', err);
  });
}

export default app;