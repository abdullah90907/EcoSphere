export enum ModuleType {
  HOME = 'HOME',
  FEATURES = 'FEATURES',
  MISSION = 'MISSION',
  IMPACT = 'IMPACT',
  DASHBOARD = 'DASHBOARD',
  FOOD_WASTE = 'FOOD_WASTE',
  AGRICULTURE = 'AGRICULTURE',
  POLLUTION = 'POLLUTION',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  ACCOUNT = 'ACCOUNT'
}

export interface User {
  id: number;
  name: string;
  email: string;
  profile_image?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AnalysisResult {
  title: string;
  category: string;
  status: string; // e.g., "Good", "Warning", "Critical", "Recyclable"
  confidence: number;
  description: string;
  recommendations: string[];
  metrics?: { label: string; value: string | number }[];
  source?: string;
}

// Specific types for Gemini Response parsing
export interface GeminiAnalysisSchema {
  title: string;
  category: string;
  status: string;
  confidence: number;
  description: string;
  recommendations: string[];
  metricLabel1?: string;
  metricValue1?: string;
  metricLabel2?: string;
  metricValue2?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  uv?: number; // Optional secondary metric
}
