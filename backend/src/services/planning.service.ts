import OpenAI from "openai";
import type { PlanningResponse, ProjectBlueprint } from '../types/planning.types';
import { OutputParser } from '../utils/parser.utils';

const client = new OpenAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  apiKey: process.env.gemini
});

const PLANNING_MODEL = "gemini-2.5-flash-lite-preview-09-2025";

interface DetectedFeatures {
  animations: boolean;
  forms: boolean;
  auth: boolean;
  stateManagement: boolean;
  dataFetching: boolean;
  routing: boolean;
  realtime: boolean;
  payments: boolean;
  fileUpload: boolean;
  charts: boolean;
  maps: boolean;
  search: boolean;
  notifications: boolean;
  darkMode: boolean;
}

interface ProjectAnalysis {
  type: 'frontend' | 'backend' | 'fullstack';
  nodeCount: number;
  features: DetectedFeatures;
  suggestedPackages: string[];
  complexity: 'simple' | 'moderate' | 'complex';
}

export class PlanningService {
  private static detectFeatures(requirements: string): DetectedFeatures {
    const reqLower = requirements.toLowerCase();
    
    return {
      animations: reqLower.includes('animat') || reqLower.includes('motion') || reqLower.includes('transition') || reqLower.includes('smooth'),
      forms: reqLower.includes('form') || reqLower.includes('input') || reqLower.includes('submit') || reqLower.includes('validation'),
      auth: reqLower.includes('auth') || reqLower.includes('login') || reqLower.includes('signup') || reqLower.includes('register') || reqLower.includes('user'),
      stateManagement: reqLower.includes('state') || reqLower.includes('redux') || reqLower.includes('zustand') || reqLower.includes('store'),
      dataFetching: reqLower.includes('api') || reqLower.includes('fetch') || reqLower.includes('data') || reqLower.includes('load'),
      routing: reqLower.includes('page') || reqLower.includes('route') || reqLower.includes('navigation') || reqLower.includes('multi'),
      realtime: reqLower.includes('realtime') || reqLower.includes('real-time') || reqLower.includes('live') || reqLower.includes('socket'),
      payments: reqLower.includes('payment') || reqLower.includes('checkout') || reqLower.includes('cart') || reqLower.includes('ecommerce'),
      fileUpload: reqLower.includes('upload') || reqLower.includes('file') || reqLower.includes('image'),
      charts: reqLower.includes('chart') || reqLower.includes('graph') || reqLower.includes('visualiz') || reqLower.includes('analytics'),
      maps: reqLower.includes('map') || reqLower.includes('location') || reqLower.includes('geo'),
      search: reqLower.includes('search') || reqLower.includes('filter') || reqLower.includes('find'),
      notifications: reqLower.includes('notif') || reqLower.includes('alert') || reqLower.includes('toast'),
      darkMode: reqLower.includes('dark') || reqLower.includes('theme') || reqLower.includes('mode'),
    };
  }

  private static suggestPackages(features: DetectedFeatures): string[] {
    const packages: string[] = [];
    
    if (features.animations) {
      packages.push('framer-motion', 'react-spring', '@react-spring/web');
    }
    if (features.forms) {
      packages.push('react-hook-form', 'zod', '@hookform/resolvers');
    }
    if (features.stateManagement) {
      packages.push('zustand', 'jotai', 'valtio');
    }
    if (features.dataFetching) {
      packages.push('@tanstack/react-query', 'swr', 'axios');
    }
    if (features.routing) {
      packages.push('react-router-dom', 'wouter');
    }
    if (features.charts) {
      packages.push('recharts', 'chart.js', 'react-chartjs-2');
    }
    if (features.notifications) {
      packages.push('react-hot-toast', 'sonner', 'react-toastify');
    }
    if (features.fileUpload) {
      packages.push('react-dropzone', 'filepond');
    }
    
    return packages;
  }

  private static analyzeProject(requirements: string): ProjectAnalysis {
    const reqLower = requirements.toLowerCase();
    
    // Detect project type
    const hasFrontend = reqLower.includes('frontend') || reqLower.includes('front-end') || reqLower.includes('ui') || reqLower.includes('interface');
    const hasBackend = reqLower.includes('backend') || reqLower.includes('back-end') || reqLower.includes('api') || reqLower.includes('server');
    const hasFullstack = reqLower.includes('fullstack') || reqLower.includes('full-stack') || reqLower.includes('full stack');
    
    let type: 'frontend' | 'backend' | 'fullstack';
    let baseNodeCount: number;
    
    if (hasFullstack || (hasFrontend && hasBackend)) {
      type = 'fullstack';
      baseNodeCount = 20;
    } else if (hasFrontend && !hasBackend) {
      type = 'frontend';
      baseNodeCount = 15;
    } else if (hasBackend && !hasFrontend) {
      type = 'backend';
      baseNodeCount = 15;
    } else {
      type = 'fullstack';
      baseNodeCount = 20;
    }
    
    // Detect features
    const features = this.detectFeatures(requirements);
    
    // Calculate complexity based on features
    const featureCount = Object.values(features).filter(Boolean).length;
      let complexity: 'simple' | 'moderate' | 'complex';
    let nodeCount = baseNodeCount;
    
    // Check if user explicitly mentions complex or production level
    const explicitlyComplex = reqLower.includes('complex') || 
                              reqLower.includes('production level') || 
                              reqLower.includes('production-level') ||
                              reqLower.includes('production grade');
    
    if (explicitlyComplex) {
      complexity = 'complex';
      nodeCount = baseNodeCount + 10;
    } else if (featureCount <= 3) {
      complexity = 'simple';
      nodeCount = baseNodeCount;
    } else if (featureCount <= 6) {
      complexity = 'moderate';
      nodeCount = baseNodeCount + 5;
    } else {
      complexity = 'complex';
      nodeCount = baseNodeCount + 10;
    }
    
    // Get suggested packages
    const suggestedPackages = this.suggestPackages(features);
    
    return {
      type,
      nodeCount,
      features,
      suggestedPackages,
      complexity
    };
  }

  private static generateSystemPrompt(analysis: ProjectAnalysis): string {
    const { type: projectType, nodeCount, features, suggestedPackages, complexity } = analysis;
    
    // Generate feature-specific instructions
    const featureInstructions: string[] = [];
    
    if (features.animations) {
      featureInstructions.push(`
🎨 ANIMATIONS REQUIRED:
- Use framer-motion or react-spring for smooth, professional animations
- Implement scroll animations, page transitions, hover effects
- Use variants for complex animation orchestration
- Add stagger effects for lists and grids
- Ensure animations are performant (use transform and opacity)
- Recommended: framer-motion with motion.div, AnimatePresence, useScroll`);
    }
    
    if (features.forms) {
      featureInstructions.push(`
📝 FORMS REQUIRED:
- Use react-hook-form for performant form handling
- Use Zod for schema validation
- Implement proper error handling and display
- Add client-side validation with real-time feedback
- Include accessibility features (aria-labels, error announcements)
- Recommended: react-hook-form + zod + @hookform/resolvers`);
    }
    
    if (features.stateManagement) {
      featureInstructions.push(`
🗄️ STATE MANAGEMENT REQUIRED:
- Use Zustand for lightweight, scalable state management
- Create separate stores for different domains (user, cart, UI)
- Implement persist middleware for local storage
- Use selectors to prevent unnecessary re-renders
- Recommended: zustand with TypeScript types`);
    }
    
    if (features.dataFetching) {
      featureInstructions.push(`
🔄 DATA FETCHING REQUIRED:
- Use @tanstack/react-query (TanStack Query) for server state
- Implement proper loading and error states
- Add optimistic updates for better UX
- Cache data appropriately
- Handle stale data and refetching
- Recommended: @tanstack/react-query v5+`);
    }
    
    if (features.notifications) {
      featureInstructions.push(`
🔔 NOTIFICATIONS REQUIRED:
- Use react-hot-toast or sonner for toast notifications
- Implement success, error, warning, and info states
- Position strategically (top-right or bottom-center)
- Add custom styling to match design
- Ensure accessibility (screen reader announcements)
- Recommended: sonner (modern, beautiful, accessible)`);
    }
    
    if (features.charts) {
      featureInstructions.push(`
📊 CHARTS & VISUALIZATIONS REQUIRED:
- Use Recharts for beautiful, responsive charts
- Implement interactive tooltips and legends
- Support multiple chart types (line, bar, pie, area)
- Make charts responsive to screen size
- Add smooth animations to data changes
- Recommended: recharts`);
    }
    
    const featureSection = featureInstructions.length > 0 ? `

=== FEATURE-SPECIFIC REQUIREMENTS ===
${featureInstructions.join('\n')}` : '';
    
    const packageSection = suggestedPackages.length > 0 ? `

=== RECOMMENDED NPM PACKAGES ===
Based on the requirements, consider using these packages:
${suggestedPackages.map(p => `- ${p}`).join('\n')}

REMEMBER: Only add packages you ACTUALLY import in your code!
Validate that every package in package.json has at least one import statement.` : '';
    const typeInstructions = {
      frontend: `
FRONTEND-ONLY PROJECT:
- Design ONLY frontend architecture (pages, components, state management, routing)
- DO NOT include backend APIs, services, or database nodes
- Focus on: React components, pages, UI state, client-side logic, routing
- Node types: page, component, state, router
- Categories: Frontend only
- Create ${nodeCount} nodes for frontend architecture`,
      
      backend: `
BACKEND-ONLY PROJECT:
- Design ONLY backend architecture (APIs, services, database, authentication)
- DO NOT include frontend pages or UI components
- Focus on: REST APIs, business logic services, database schema, authentication, middleware
- Node types: api, service, database, auth, middleware
- Categories: Backend, Database, Auth
- Create ${nodeCount} nodes for backend architecture`,
      
      fullstack: `
FULLSTACK PROJECT:
- Design COMPLETE architecture with both frontend AND backend
- Include: Frontend (pages, components) + Backend (APIs, services) + Database
- Frontend: React pages and components
- Backend: Node.js APIs and services
- Database: MongoDB collections
- Create ${nodeCount} nodes covering the entire stack`
    };

    return `You are a world-class software architect with expertise in modern web development, UX design, and scalable architecture.

PROJECT COMPLEXITY: ${complexity.toUpperCase()}
DETECTED FEATURES: ${Object.entries(features).filter(([_, v]) => v).map(([k]) => k).join(', ') || 'Basic functionality'}

${typeInstructions[projectType]}
${featureSection}
${packageSection}


=== 🚨 CRITICAL: detailedContext STRING FORMATTING 🚨 ===

The "detailedContext" field MUST be a SINGLE, CONTINUOUS STRING on ONE LINE.

✅ CORRECT FORMAT:
"detailedContext": "Section 1: File Structure. Create these files: src/App.tsx for main app, src/components/Header.tsx for header component. Section 2: Components. The Header component takes props: title (string), onMenuClick (function). It should render a nav element with Tailwind classes. Section 3: (continue for 3000+ words)..."

❌ WRONG - DO NOT DO THIS:
"detailedContext": "Section 1: File Structure
Create these files:
- src/App.tsx
- src/components/Header.tsx"

⚠️ CRITICAL RULES FOR detailedContext:
1. Write the ENTIRE 3000+ word guide as ONE continuous string
2. NO actual line breaks - write it all in one line
3. Use periods and commas to separate sections, NOT newlines
4. DO NOT use \\n escape sequences either - just write continuously
5. Remove ALL emojis, tabs, and special characters
6. Use only: letters, numbers, spaces, periods, commas, hyphens, parentheses
7. Think of it like writing a very long paragraph

⚠️ GENERAL JSON RULES:
- NO trailing commas before } or ]
- Use double quotes for all strings
- Ensure all brackets/braces are properly paired



CRITICAL CONSTRAINTS:
1. Use ONLY React + TypeScript for frontend (if applicable)
2. Use ONLY Node.js + Express for backend (if applicable)
3. Use ONLY MongoDB for database (if applicable)
4. Avoid external APIs that require API keys (use mock data if needed)
5. Design for Vercel serverless deployment
6. Ensure mobile-responsive design with Tailwind CSS
7. Follow accessibility best practices (WCAG 2.1)

YOUR OUTPUT MUST CONTAIN EXACTLY 2 THINGS:

1. WORKFLOW VISUALIZATION (nodes + edges)
2. DETAILED IMPLEMENTATION PROMPT (for code generation)

WORKFLOW DESIGN PRINCIPLES:
- Create exactly ${nodeCount} nodes
- Each node must have a clear, specific purpose
- Connect nodes with edges showing data/control flow
- Use appropriate node types and categories
- Keep labels SHORT (2-3 words max)

OUTPUT FORMAT (PURE JSON - NO MARKDOWN):
{
  "projectName": "Descriptive Name",
  "description": "Brief description",
  "techStack": {
    "frontend": ["React", "TypeScript", "Tailwind"],
    "backend": ["Node.js", "Express"],
    "database": ["MongoDB"],
    "external": ["minimal external services"]
  },
  "features": ["feature1", "feature2"],
  "workflow": {
    "nodes": [
      {
        "id": "unique-kebab-case-id",
        "type": "page|component|api|service|database|auth",
        "label": "Short Name",
        "category": "Frontend|Backend|Database|Auth"
      }
    ],
    "edges": [
      {
        "id": "e1",
        "source": "source-node-id",
        "target": "target-node-id",
        "label": "action description",
        "type": "http|database|event"
      }
    ]
  },
  "detailedContext": "ULTRA-DETAILED IMPLEMENTATION GUIDE - This is ONE continuous string using \\\\n for line breaks. Include: SECTION 1 (File Structure), SECTION 2 (Components), SECTION 3 (APIs), SECTION 4 (Database), SECTION 5 (Styling), SECTION 6 (Auth), SECTION 7 (Dependencies), SECTION 8 (State), SECTION 9 (Routing), SECTION 10 (Performance), SECTION 11 (Unique Features), SECTION 12 (Node/Edge Details for ALL nodes and edges), SECTION 13 (Checklist). Make it 3000+ words with EVERY detail needed for code generation."
}

CRITICAL RULES:
1. Create EXACTLY ${nodeCount} nodes (no more, no less)
2. Every node must have a clear, specific purpose
3. Every edge must show actual data/control flow
4. Labels must be SHORT (2-3 words max)
5. Output PURE JSON (no markdown, no comments)
6. Start with { and end with }
7. NO TRAILING COMMAS
8. Use double quotes for all strings
9. The detailedContext must be EXTREMELY DETAILED (3000+ words)
10. Include EVERYTHING needed to generate working code

REMEMBER: The detailedContext will be passed directly to a code generation AI. Make it comprehensive!

🚨 FINAL CHECK BEFORE RETURNING:
1. Is detailedContext ONE continuous line with NO line breaks?
2. Have you included all 13 sections in detailedContext?
3. Is it at least 3000 words?
4. Are there NO trailing commas in the JSON?
5. Did you include details for EVERY node and edge in Section 12?`;

}

  static async generateBlueprint(
    requirements: string,
    retryCount: number = 0
  ): Promise<PlanningResponse> {
    const MAX_RETRIES = 3;

    try {
      // Analyze project requirements
      const analysis = this.analyzeProject(requirements);
      const { type: projectType, nodeCount, complexity, features } = analysis;
      
      console.log(`\n🔍 PROJECT ANALYSIS:`);
      console.log(`  Type: ${projectType.toUpperCase()}`);
      console.log(`  Complexity: ${complexity.toUpperCase()}`);
      console.log(`  Nodes: ${nodeCount}`);
      console.log(`  Features: ${Object.entries(features).filter(([_, v]) => v).map(([k]) => k).join(', ') || 'None detected'}`);
      console.log(`  Suggested packages: ${analysis.suggestedPackages.join(', ') || 'None'}`);
      console.log(`\n📝 Generating blueprint (attempt ${retryCount + 1}/${MAX_RETRIES + 1})...`);

      const completion = await client.chat.completions.create({
        model: PLANNING_MODEL,
        messages: [
          { 
            role: "system", 
            content: this.generateSystemPrompt(analysis) 
          },
          { 
            role: "user", 
            content: `Create a ${projectType.toUpperCase()} project blueprint for:

"${requirements}"

🎯 YOUR MISSION:
Design a UNIQUE, CREATIVE, and PRODUCTION-READY application that goes beyond basic requirements.

📋 DETAILED REQUIREMENTS:
1. Analyze the user's request and identify:
   - Core features needed
   - User personas and use cases
   - Potential edge cases
   - Opportunities for delightful UX

2. Design a comprehensive workflow with EXACTLY ${nodeCount} nodes:
   - Each node must have a specific, clear purpose
   - Show all data flows and relationships
   - Include error handling nodes
   - Add loading/optimistic update nodes

3. Create an ULTRA-DETAILED implementation prompt (3000+ words minimum) following the 12-section template:
   
   ✅ SECTION 1: COMPLETE FILE STRUCTURE
   List EVERY single file with absolute paths and purposes
   
   ✅ SECTION 2: DETAILED COMPONENT SPECIFICATIONS
   For each component: props, state, hooks, handlers, styling, usage examples
   
   ✅ SECTION 3: API ENDPOINTS (if applicable)
   Complete endpoint specs with request/response schemas
   
   ✅ SECTION 4: DATABASE SCHEMA (if applicable)
   Exact field names, types, validation, indexes, relationships
   
   ✅ SECTION 5: STYLING & DESIGN SYSTEM
   Color palette, typography, spacing, variants, animations
   
   ✅ SECTION 6: AUTHENTICATION FLOW (if applicable)
   Step-by-step registration, login, token management
   
   ✅ SECTION 7: DEPENDENCIES & PACKAGES
   Exact packages with versions and usage locations
   
   ✅ SECTION 8: STATE MANAGEMENT
   Store structure, actions, selectors, consumption patterns
   
   ✅ SECTION 9: ROUTING CONFIGURATION
   All routes, protection, parameters, nesting, redirects
   
   ✅ SECTION 10: PERFORMANCE OPTIMIZATIONS
   Code splitting, lazy loading, memoization, image optimization
   
   ✅ SECTION 11: UNIQUE TOUCHES ⭐
   Creative elements that make THIS project special and memorable:
   - Custom animations with exact descriptions
   - Unique UI patterns not seen in typical apps
   - Delightful micro-interactions
   - Easter eggs or hidden features
   - Personality in messaging and copy
   - Innovative approaches to common problems
   
   ✅ SECTION 12: IMPLEMENTATION CHECKLIST
   Step-by-step build order from setup to polish

4. ENSURE UNIQUENESS:
   - Add at least 3 unique/creative features not explicitly requested
   - Use interesting color schemes (not just blue/gray)
   - Include thoughtful animations and transitions
   - Add personality through copy and messaging
   - Think about edge cases and handle them gracefully
   - Make it feel like a real product, not a tutorial project

5. CRITICAL VALIDATION:
   - Every package mentioned must be justified
   - Every component must be fully specified
   - All data flows must be documented
   - Error states must be handled
   - Loading states must be designed
   - Mobile responsiveness is mandatory
   - Accessibility is non-negotiable

🎨 CREATIVITY REQUIREMENTS:
- Choose a unique color palette (provide exact HSL values)
- Design custom animations (describe exact motion/timing)
- Add micro-interactions (hover effects, click feedback, transitions)
- Include delightful details (loading skeletons, empty states, success celebrations)
- Make the user experience memorable and enjoyable

🚀 OUTPUT REQUIREMENTS:
- Pure JSON (no markdown, no comments)
- Start with { and end with }
- NO trailing commas
- implementationPrompt must be 3000+ words
- Include ALL 12 sections in detail
- Make it SO comprehensive that the AI can generate PERFECT code

Remember: Each project should feel UNIQUE and SPECIAL, not generic!`
          }
        ],
        temperature: 0.7, // Higher for more creativity and uniqueness
        max_tokens: 20000, // Increased for longer, more detailed prompts
      });

      const rawOutput = completion?.choices?.[0]?.message?.content;
      console.log(rawOutput);
      if (!rawOutput) {
        throw new Error('No response from AI');
      }

      console.log('Received response, parsing...');
      const blueprint = OutputParser.extractProjectBlueprint(rawOutput);
      
      if (!blueprint) {
        if (retryCount < MAX_RETRIES) {
          console.log(`Parsing failed, retrying (${retryCount + 1}/${MAX_RETRIES})...`);
          await new Promise(resolve => setTimeout(resolve, 1500));
          return this.generateBlueprint(requirements, retryCount + 1);
        }
        
        throw new Error('Failed to parse blueprint after multiple attempts');
      }

      console.log('Blueprint generated successfully');
      console.log(`Nodes: ${blueprint.workflow.nodes.length} | Edges: ${blueprint.workflow.edges.length}`);

      return {
        success: true,
        data: { blueprint, rawOutput }
      };

    } catch (error: any) {
      console.error('Error:', error.message);
      
      if (retryCount < MAX_RETRIES) {
        console.log(`Error occurred, retrying (${retryCount + 1}/${MAX_RETRIES})...`);
        await new Promise(resolve => setTimeout(resolve, 1500));
        return this.generateBlueprint(requirements, retryCount + 1);
      }
      
      return { 
        success: false, 
        error: `Failed after ${MAX_RETRIES + 1} attempts: ${error.message}` 
      };
    }
  }

  static createDetailedPromptFromBlueprint(blueprint: ProjectBlueprint): string {
    // Return detailedContext directly without any modifications
    // It already contains all the comprehensive implementation instructions
    return blueprint.detailedContext;
  }
}
