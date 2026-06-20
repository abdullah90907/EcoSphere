
# EcoSphere Guardian - Detailed Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Core Files &amp; Dependencies](#core-files--dependencies)
4. [Frontend Components](#frontend-components)
5. [Backend Architecture](#backend-architecture)
6. [Service Layer](#service-layer)
7. [Type Definitions](#type-definitions)
8. [Data Flow &amp; Workflows](#data-flow--workflows)

---

## Project Overview
EcoSphere Guardian is an AI-powered sustainability platform that combines:
- Food waste analysis with image recognition
- Plant health monitoring and disease detection
- Pollution control and environmental monitoring
- AI chat assistant for eco-friendly advice

### Tech Stack
- **Frontend**: React 18, TypeScript 5, Vite 5, Tailwind CSS
- **Backend**: Node.js, Express.js, sql.js (SQLite)
- **AI/ML**: Hugging Face inference via Python
- **Auth**: JWT, bcryptjs for password hashing

---

## Project Structure
```
EcoSphere/
├── components/               # React UI components
├── services/                 # API and service layer
├── server/                   # Backend API
├── types.ts                  # TypeScript type definitions
├── App.tsx                   # Main app component &amp; routing
├── index.tsx                 # Entry point
├── vite.config.ts            # Vite config
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies &amp; scripts
└── .env                      # Environment variables
```

---

## Core Files &amp; Dependencies

### 1. `index.tsx` (Entry Point)
- **Purpose**: Mounts React app to root DOM element
- **Dependencies**:
  - React
  - ReactDOM
  - `App.tsx`

### 2. `App.tsx` (Main Application)
- **Purpose**: Application routing &amp; authentication state management
- **Dependencies**:
  - React (useState, useEffect)
  - All UI components from `components/`
  - `types.ts` (ModuleType, AuthState)
  - `services/authService.ts`
- **State**:
  - `currentModule`: Manages which page is active
  - `auth`: Manages user login state
- **Key Functions**:
  - `handleLogin()`: Updates auth state and redirects to Dashboard
  - `handleLogout()`: Clears local storage and redirects to Home
  - `renderModule()`: Conditionally renders components based on `currentModule` and authentication

### 3. `package.json`
- **Scripts**:
  - `dev`: Start Vite dev server
  - `server`: Start Express backend server
  - `build`: Build for production
  - `preview`: Preview production build

---

## Frontend Components

### Public Navbar (`components/PublicNavbar.tsx`)
- **Purpose**: Main navigation bar for unauthenticated users
- **Dependencies**:
  - React (useState, useEffect)
  - Lucide icons (Leaf, Menu, X)
  - `types.ts` (ModuleType)
- **Features**:
  - Scroll-triggered background change
  - Desktop &amp; mobile menu toggle
  - Navigates to Home, Features, Impact, Mission, Login
  - Shows active module indicator

### Landing Page (`components/LandingPage.tsx`)
- **Purpose**: Home page with hero section, stats, and brand info
- **Dependencies**:
  - React
  - Lucide icons (ArrowRight, Sparkles, Shield, Globe, Zap, Leaf, CheckCircle2)
  - `PublicNavbar.tsx`
  - `PublicFooter.tsx`
  - `types.ts` (ModuleType)
- **Features**:
  - Animated hero with "REDEFINING ECOLOGY BY DESIGN"
  - Core pillars section (Global Impact, Zero Waste, Visionary Tech)
  - Trusted brands showcase
  - Stats breakdown

### Features / Mission / Impact Pages
- **Purpose**: Static info pages about the platform
- **Dependencies**:
  - `PublicNavbar.tsx`
  - `PublicFooter.tsx`
  - `types.ts` (ModuleType)

### Login Page (`components/LoginPage.tsx`)
- **Purpose**: User authentication
- **Dependencies**:
  - React (useState)
  - `services/authService.ts`
- **Features**:
  - Email &amp; password input
  - Login button
  - Calls `authService.login()`
  - Redirects to Dashboard on success via `onLogin` prop

### Signup Page (`components/SignupPage.tsx`)
- **Purpose**: New user registration
- **Dependencies**:
  - React (useState)
  - `services/authService.ts`
- **Features**:
  - Name, email, password inputs
  - Calls `authService.signup()`
  - Redirects to Dashboard on success via `onSignup` prop

### Layout (`components/Layout.tsx`)
- **Purpose**: Main layout for authenticated users (sidebar + content area)
- **Dependencies**:
  - React
  - Lucide icons (House, Leaf, Droplets, Wind, User, LogOut, Sparkles)
  - `components/AIAssistant.tsx`
  - `types.ts` (ModuleType)
- **Features**:
  - Sidebar navigation (Dashboard, Food Waste, Agriculture, Pollution, Account)
  - Logout button
  - Floating EcoBot AI assistant
  - Shows active module

### Dashboard (`components/Dashboard.tsx`)
- **Purpose**: Main hub showing sustainability metrics and daily tip
- **Dependencies**:
  - React (useState, useEffect)
  - Lucide icons (TrendingUp, Droplets, Leaf, AlertTriangle, Sparkles, Loader2)
  - Recharts (BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell)
  - `services/geminiService.ts` (getTextAdvice)
  - `types.ts` (ChartDataPoint)
- **Features**:
  - Weekly summary widgets (Food Saved, Water Usage, Carbon Offset, Alerts)
  - Weekly waste trends bar chart
  - Waste composition pie chart
  - Daily eco tip from Gemini

### Food Waste Module (`components/FoodWasteModule.tsx`)
- **Purpose**: Image-based food freshness &amp; waste analysis
- **Dependencies**:
  - React (useState, useRef)
  - Lucide icons (Upload, Camera, Loader2, CheckCircle2, AlertTriangle, HeartHandshake)
  - `services/geminiService.ts` (analyzeImageWithGemini)
  - `types.ts` (AnalysisResult)
- **Features**:
  - Image upload / capture
  - Gemini image analysis
  - Displays freshness status, category, confidence, description, metrics, and recommendations

### Agriculture Module (`components/AgricultureModule.tsx`)
- **Purpose**: Plant health monitoring and irrigation planning
- **Dependencies**:
  - React (useState, useRef)
  - Lucide icons (Sprout, Droplets, Camera, Loader2, Activity, ThermometerSun)
  - `services/geminiService.ts` (analyzeImageWithGemini, getTextAdvice)
  - `types.ts` (AnalysisResult)
- **Two Tabs**:
  1. **Plant Health**:
     - Image upload
     - First tries local inference via `http://localhost:5000/api/analyze-plant`
     - Falls back to Gemini if local confidence &lt; 0.75 or fails
     - Displays diagnosis, status, confidence, treatment plan
  2. **Smart Irrigation**:
     - Crop type selector (Tomato, Wheat, Corn, Rice, Potato)
     - Soil moisture slider
     - Generates irrigation schedule via Gemini

### Pollution Module (`components/PollutionModule.tsx`)
- **Purpose**: Environmental monitoring and waste classification
- **Dependencies**:
  - React (useState, useRef)
  - Lucide icons (Wind, Trash2, Loader2, Recycle, CloudRain, AlertOctagon, Search, MapPin, Navigation, MessageCircle, Send, Gauge)
  - `services/geminiService.ts` (analyzeImageWithGemini, getTextAdvice, getCityAirQuality, getAirQualityByCoordinates, getContextualAdvice)
  - `types.ts` (AnalysisResult)
- **Two Sections**:
  1. **Air &amp; Water Monitor**:
     - Manual mode: AQI slider + Water pH slider → impact analysis
     - Live city mode: Search by city or use geolocation → real-time AQI via Google Search + Gemini
     - Inline EcoBot chat for follow-up questions
  2. **Waste Smart Sorting**:
     - Image upload
     - Gemini-based waste classification
     - Shows category, disposal instructions

### Account Settings (`components/AccountSettings.tsx`)
- **Purpose**: User profile management
- **Dependencies**:
  - React (useState)
  - Lucide icons (User, Mail, Lock, Save, CheckCircle2, AlertCircle, Upload, Camera)
  - `services/authService.ts`
- **Features**:
  - Update name / profile image
  - Change password
  - Displays user stats

### AI Assistant (`components/AIAssistant.tsx`)
- **Purpose**: Floating EcoBot chat widget available everywhere for authenticated users
- **Dependencies**:
  - React (useState, useRef, useEffect)
  - Lucide icons (MessageSquare, Send, X, Bot, User)
  - `services/geminiService.ts` (createChatSession)
- **Features**:
  - Collapsible chat widget
  - Chat history
  - Sends messages to Gemini chat session
  - Markdown-like response rendering

### Public Footer (`components/PublicFooter.tsx`)
- **Purpose**: Footer for public pages
- **Dependencies**: React, Lucide icons (Leaf)

---

## Backend Architecture
**Server URL**: `http://localhost:5000`

### Entry Point: `server/index.js`
- **Imports**:
  - Express
  - CORS
  - bcryptjs (password hashing)
  - jsonwebtoken (JWT auth)
  - dotenv (env vars)
  - spawn (child_process, for Python service)
  - node-fetch
  - fs, path, fileURLToPath
  - `./database.js`

- **Initialization Flow**:
  1. Load env vars
  2. Initialize Express app with CORS and JSON body parser
  3. Wait for `dbPromise` from `database.js`
  4. Define helper functions (`queryDB`, `runDB`)
  5. Try to start Python inference service (optional)
  6. Define all API routes
  7. Listen on port 5000

### Database: `server/database.js`
- **Library**: sql.js (pure JavaScript SQLite, no native modules)
- **Tables**:
  1. `users`: id (PK), name, email (unique), password, profile_image, created_at
  2. `user_stats`: id (PK), user_id (FK), food_saved, water_saved, carbon_offset, alerts_count
- **Persistence**: Saves to `server/database.sqlite` file

### API Routes

#### Auth Routes
- **POST /api/signup**:
  - Accepts: `{ name, email, password }`
  - Hashes password with bcryptjs
  - Creates user and initial user_stats
  - Returns: `{ token, user: { id, name, email } }`
- **POST /api/login**:
  - Accepts: `{ email, password }`
  - Verifies password
  - Returns: `{ token, user: { id, name, email, profile_image } }`

#### User Routes (Protected by JWT)
- **GET /api/user/profile**: Returns user profile
- **PUT /api/user/profile**: Updates name &amp; profile image
- **PUT /api/user/password**: Changes password
- **GET /api/user/stats**: Returns user stats

#### Plant Analysis Route
- **POST /api/analyze-plant**:
  - Accepts: `{ image: base64 string }`
  - Tries local inference via Python service at `http://127.0.0.1:5001/predict`
  - If confidence &gt; 0.75: Returns local result with `fallback: false`
  - Else: Returns `fallback: true` to trigger Gemini on frontend
  - On error: Returns `fallback: true`

---

## Service Layer

### Auth Service (`services/authService.ts`)
- **API URL**: `http://localhost:5000/api`
- **Functions**:
  - `login(email, password)` → Posts to `/login`, stores token &amp; user in localStorage
  - `signup(name, email, password)` → Posts to `/signup`, stores token &amp; user in localStorage
  - `logout()` → Removes token &amp; user from localStorage
  - `getCurrentUser()` → Returns user from localStorage or null
  - `getToken()` → Returns token from localStorage
  - `updateProfile(name, profile_image)` → Puts to `/user/profile`
  - `changePassword(oldPassword, newPassword)` → Puts to `/user/password`
  - `getUserStats()` → Gets from `/user/stats`

### Gemini Service (`services/geminiService.ts`)
- **API Key**: From `process.env.API_KEY`
- **Model**: `gemini-3.1-flash-lite`
- **Functions**:
  - `analyzeImageWithGemini(base64Image, prompt)` → Analyzes image, returns structured `AnalysisResult`
  - `getTextAdvice(prompt)` → Generates text advice
  - `getCityAirQuality(city)` → Gets real-time AQI for city using Google Search
  - `getAirQualityByCoordinates(lat, lon)` → Gets AQI for location
  - `getContextualAdvice(context, question)` → Answers based on context
  - `createChatSession()` → Creates persistent chat session for EcoBot

---

## Type Definitions (`types.ts`)

### Enums &amp; Interfaces
- **ModuleType**: Enum for all pages/modules
- **User**: User profile interface
- **AuthState**: Authentication state (isAuthenticated, user)
- **AnalysisResult**: Structured result for image analysis
- **GeminiAnalysisSchema**: Schema for Gemini JSON responses
- **ChartDataPoint**: For dashboard charts

---

## Data Flow &amp; Workflows

### 1. User Authentication Flow
```
LoginPage → authService.login() → POST /api/login → Backend: bcrypt.verify + JWT → Returns token &amp; user → App.tsx sets auth state → Redirect to Dashboard
```

### 2. Food Waste Analysis Flow
```
FoodWasteModule → User uploads image → analyzeImageWithGemini() → Gemini analyzes → Returns AnalysisResult → Component displays results
```

### 3. Plant Health Analysis Flow
```
AgricultureModule (Plant Health) → User uploads image → POST /api/analyze-plant → Backend tries Python inference → 
  If confidence > 0.75: Return local result → Component displays
  Else / Error: Return fallback: true → Component calls analyzeImageWithGemini() → Gemini analyzes → Displays results
```

### 4. Pollution - City AQI Flow
```
PollutionModule → User enters city / uses geolocation → getCityAirQuality() or getAirQualityByCoordinates() → Gemini + Google Search → Displays AQI report
```

### 5. AI Chat Flow
```
AIAssistant → User sends message → createChatSession() → Gemini chat session → Displays response
```
