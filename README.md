# EcoSphere Guardian

EcoSphere Guardian is an AI-assisted sustainability dashboard built with React, TypeScript, and Vite. It brings together food waste analysis, smart agriculture tools, pollution monitoring, and a conversational eco assistant in one single-page application.

The app turns images and simple inputs into practical guidance so users can make faster, better environmental decisions. Google Gemini powers the analysis layer, while the interface stays focused on clarity, speed, and useful output.

## Overview

EcoSphere Guardian is organized around four core sustainability workflows:

- Food waste detection and disposal guidance
- Plant health and irrigation support
- Air quality, water quality, and waste sorting utilities
- A floating AI assistant for sustainability questions and app guidance

The dashboard combines these workflows into a single experience with summary metrics, charts, and a daily eco tip.

## Key Features

### Dashboard

- Weekly sustainability snapshot with food saved, water usage, carbon offset, and pending alerts
- Bar chart showing weekly waste trends
- Pie chart showing waste composition by category
- Daily sustainability tip generated through Gemini

### Food Waste Module

- Upload or capture a food image for analysis
- Detects whether the item is perishable or non-perishable
- Provides freshness status such as fresh, edible but old, or spoiled
- Returns confidence, descriptive analysis, and practical recommendations
- Suggests donation, composting, refrigeration, or immediate consumption

### Agriculture Module

- Plant health view for leaf or crop image review
- Smart irrigation controls for crop type and soil moisture
- Crop options include tomato, wheat, corn, rice, and potato
- Weather context is shown to support irrigation decisions
- Built to support diagnosis and scheduling workflows

### Pollution Control Module

- Manual AQI input for environmental review
- Live city-based air quality lookup flow
- Water pH monitoring for contamination awareness
- Smart waste sorting with image upload support
- Bin recommendation and recyclability guidance

### Eco Assistant

- Floating chat widget available from every screen
- Context-aware sustainability help
- Markdown-style response formatting
- Helpful for app usage, recycling, and environmental advice

## Screenshots

The screenshots below are taken from the local `Results` folder in this repository.

### Dashboard

![Dashboard overview](Screenshot%202026-04-09%20162546.png)

### Food Waste Analysis

![Food waste analysis result](Screenshot%202026-04-09%20162644.png)

![Food waste spoiled result](Screenshot%202026-04-09%20162911.png)

## Technology Stack

### Frontend

- React 18
- TypeScript 5
- Vite 5

### UI and Visualization

- Lucide React for icons
- Recharts for charts and graphs
- Tailwind CSS via CDN for utility styling

### AI and Data Services

- Google Gemini 2.5 Flash
- @google/genai SDK
- Structured JSON responses for image analysis
- Google Search-backed retrieval for air quality data

## Project Structure

```text
EcoSphere-main/
├── App.tsx
├── index.tsx
├── types.ts
├── components/
│   ├── Layout.tsx
│   ├── Dashboard.tsx
│   ├── FoodWasteModule.tsx
│   ├── AgricultureModule.tsx
│   ├── PollutionModule.tsx
│   └── AIAssistant.tsx
├── services/
│   └── geminiService.ts
├── Results/
│   ├── Screenshot 2026-04-09 162546.png
│   ├── Screenshot 2026-04-09 162644.png
│   └── Screenshot 2026-04-09 162911.png
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## How It Works

1. The user selects a module from the sidebar.
2. The selected component collects image input or environmental values.
3. The UI sends the data to the Gemini service layer.
4. Gemini returns structured analysis or advice.
5. The result is rendered into cards, charts, or recommendations.

This structure keeps the application modular and makes each sustainability workflow easy to extend.

## Setup

### Prerequisites

- Node.js 18 or newer
- npm
- A valid Google Gemini API key

### Install Dependencies

```bash
npm install
```

### Environment Variable

The Gemini service expects an API key in the environment.

```env
API_KEY=your_gemini_api_key_here
```

If you are running the project in a browser-based Vite setup, make sure the environment configuration matches your deployment approach.

## Run the Project

### Development

```bash
npm run dev
```

The app will start with Vite and print a local URL in the terminal.

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Module Details

### Dashboard

The dashboard is the landing view of the app. It shows performance indicators and visual summaries so the user can understand current impact at a glance. It also pulls a short daily sustainability tip from Gemini.

### Food Waste Workflow

The food module accepts an image, sends it to Gemini, and expects structured JSON back. The response includes a title, category, confidence, status, description, metric fields, and a list of recommendations. This is used to present a simple freshness and disposal decision flow.

### Agriculture Workflow

The agriculture module supports two working modes: plant health review and smart irrigation. The current interface lets the user upload a leaf image, adjust soil moisture, pick a crop type, and work from weather context.

### Pollution Workflow

The pollution module focuses on two areas: environmental monitoring and sorting waste. It includes AQI and pH controls, city-based lookup flow, and image-based waste classification support.

### AI Assistant

EcoBot is a floating assistant that remains available across the app. It is intended for sustainability questions, app guidance, and short practical suggestions.

## Gemini Integration

The service layer in `services/geminiService.ts` handles:

- Image analysis for food and waste workflows
- Text advice generation
- City and coordinate-based AQI retrieval
- Contextual responses for chat-style interactions
- Chat session creation for EcoBot

Responses are normalized into application types so the UI can render them consistently.

## Troubleshooting

- If the app opens but image analysis fails, verify that `API_KEY` is set correctly.
- If the build warns about large chunks, that is a performance warning rather than a runtime failure.
- If the dev server does not start on the default port, check whether another process is already using port 5173.

## Build Status

The project builds successfully with `npm run build`, and the Vite development server starts correctly with `npm run dev`.

## License

This project is provided as part of the EcoSphere Guardian workspace.
