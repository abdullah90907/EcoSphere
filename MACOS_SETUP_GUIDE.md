
# EcoSphere Guardian - macOS Setup Guide

## Prerequisites
Before starting, make sure you have the following installed:

### 1. Xcode Command Line Tools
First, install Xcode Command Line Tools (required for compiling some npm packages):
```bash
xcode-select --install
```
If you get an error that it's already installed, you're good to go!

### 2. Homebrew (Optional but Recommended)
Install Homebrew for easy package management:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Then add Homebrew to your PATH (follow instructions in terminal output):
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' &gt;&gt; ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 3. Node.js (Required)
Install Node.js 18 or higher:
- **Option 1 (Homebrew)**:
  ```bash
  brew install node
  ```
- **Option 2 (Download)**: Go to [nodejs.org](https://nodejs.org/) and download the latest LTS version

### 4. Python 3 (Optional - For Local Plant Disease Detection)
If you want to use the local Hugging Face inference service:
```bash
brew install python
```
Or download from [python.org](https://www.python.org/)

### 5. Git (Optional but Recommended)
```bash
brew install git
```

---

## Step 1: Get the Project Files
If you haven't already, navigate to your project directory:
```bash
cd "/path/to/your/EcoSphere"
```
Or if you're cloning from git:
```bash
git clone &lt;your-repository-url&gt;
cd EcoSphere
```

---

## Step 2: Install Dependencies

### Frontend &amp; Backend Dependencies
```bash
npm install
```
This will install all required packages from package.json

---

## Step 3: Configure Environment Variables

### Check Existing .env Files
The project should already have:
- `.env` in project root (contains API_KEY)
- `server/.env` (contains PORT and JWT_SECRET)

### If Missing, Create Them:

#### Project Root .env:
```env
API_KEY=your_google_gemini_api_key_here
```

#### Server .env (create in `server/` directory):
```env
PORT=5000
JWT_SECRET=ecosphere-secret-key-2026-dynamic-vanguard
```

**Important**: You need a valid Google Gemini API key! Get one from [Google AI Studio](https://aistudio.google.com/).

---

## Step 4: Start the Servers

### Option 1: Both Servers (Recommended)
You need two terminal windows/tabs for this.

**Terminal 1 - Backend Server**:
```bash
cd "/path/to/your/EcoSphere"
npm run server
```
You should see: `Server running on http://localhost:5000`

**Terminal 2 - Frontend Server**:
```bash
cd "/path/to/your/EcoSphere"
npm run dev
```
You should see something like: `Local:   http://localhost:5173/`

### Option 2: Frontend Only (Works Without Backend)
If you only want to use the basic features (no login/signup, no local plant detection):
```bash
npm run dev
```

---

## Step 5: Open the App
Open your browser and go to: `http://localhost:5173`

---

## Troubleshooting on macOS

### Issue 1: npm install fails with permission errors
**Fix**: Use npm without sudo, or fix permissions:
```bash
sudo chown -R $(whoami) ~/.npm
```

### Issue 2: "Cannot find module" errors
**Fix**: Delete node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: Python service not starting
The local plant disease detection service is optional. If you get errors:
1. Make sure Python 3 is installed
2. Install required Python packages (check server/inference_service.py for dependencies)
3. The app will still work fine using Gemini as fallback

### Issue 4: Port already in use
If port 5173 or 5000 is taken:
- For frontend: Vite will automatically use next available port
- For backend: Change PORT in server/.env to something else (like 5001)

---

## Optional: Set Up Python Inference Service (Local Plant Detection)
1. Navigate to server directory:
   ```bash
   cd server
   ```
2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   ```
3. Activate virtual environment:
   ```bash
   source venv/bin/activate
   ```
4. Install required packages (check `server/inference_service.py` for dependencies):
   ```bash
   pip install fastapi uvicorn transformers torch pillow python-multipart
   ```
5. Run the service:
   ```bash
   python3 inference_service.py
   ```

---

## Development Workflow

### Making Changes
- The Vite dev server supports hot module replacement (HMR), so your changes will show up instantly in the browser!
- For backend changes, you need to restart the server (Ctrl+C then npm run server again)

### Building for Production
```bash
npm run build
```
This creates an optimized build in the `dist/` directory

### Preview Production Build
```bash
npm run preview
```

---

## Project Structure Recap
```
EcoSphere/
├── components/       # React UI components
├── services/         # API services (gemini, auth)
├── server/           # Backend API
├── App.tsx           # Main app
├── index.tsx         # Entry point
├── types.ts          # TypeScript types
└── ...
```

---

## Key Features to Test
1. **Landing Page**: Check out the hero section and features
2. **Food Waste Module**: Upload a food image and see Gemini analyze it
3. **Agriculture Module**: Try plant health check and irrigation planning
4. **Pollution Module**: Test AQI lookup and waste classification
5. **AI Assistant**: Chat with EcoBot
6. **Login/Signup** (if backend is running): Create an account

---

## Support
If you run into issues:
1. Check that all dependencies are installed
2. Verify your API key is correct in .env
3. Check the terminal logs for errors
4. Make sure both servers are running if using backend features
