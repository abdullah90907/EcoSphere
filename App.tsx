import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import FoodWasteModule from './components/FoodWasteModule';
import AgricultureModule from './components/AgricultureModule';
import PollutionModule from './components/PollutionModule';
import LandingPage from './components/LandingPage';
import FeaturesPage from './components/FeaturesPage';
import MissionPage from './components/MissionPage';
import ImpactPage from './components/ImpactPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AccountSettings from './components/AccountSettings';
import { ModuleType, AuthState } from './types';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleType>(ModuleType.HOME);
  const [auth, setAuth] = useState<AuthState>(() => {
    const user = authService.getCurrentUser();
    return {
      isAuthenticated: !!user,
      user
    };
  });

  const handleLogin = (userData: any) => {
    setAuth({
      isAuthenticated: true,
      user: userData
    });
    setCurrentModule(ModuleType.DASHBOARD);
  };

  const handleLogout = () => {
    authService.logout();
    setAuth({ isAuthenticated: false, user: null });
    setCurrentModule(ModuleType.HOME);
  };

  const renderModule = () => {
    if (!auth.isAuthenticated) {
      switch (currentModule) {
        case ModuleType.LOGIN:
          return <LoginPage onLogin={handleLogin} setModule={setCurrentModule} />;
        case ModuleType.SIGNUP:
          return <SignupPage onSignup={handleLogin} setModule={setCurrentModule} />;
        case ModuleType.FEATURES:
          return <FeaturesPage setModule={setCurrentModule} onGetStarted={() => setCurrentModule(ModuleType.LOGIN)} />;
        case ModuleType.MISSION:
          return <MissionPage setModule={setCurrentModule} onGetStarted={() => setCurrentModule(ModuleType.LOGIN)} />;
        case ModuleType.IMPACT:
          return <ImpactPage setModule={setCurrentModule} onGetStarted={() => setCurrentModule(ModuleType.LOGIN)} />;
        case ModuleType.HOME:
        default:
          return <LandingPage setModule={setCurrentModule} onGetStarted={() => setCurrentModule(ModuleType.LOGIN)} />;
      }
    }

    switch (currentModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard />;
      case ModuleType.ACCOUNT:
        return <AccountSettings user={auth.user} />;
      case ModuleType.FOOD_WASTE:
        return <FoodWasteModule />;
      case ModuleType.AGRICULTURE:
        return <AgricultureModule />;
      case ModuleType.POLLUTION:
        return <PollutionModule />;
      default:
        return <Dashboard />;
    }
  };

  if (!auth.isAuthenticated) {
    return renderModule();
  }

  return (
    <Layout 
      currentModule={currentModule} 
      setModule={setCurrentModule}
      onLogout={handleLogout}
      user={auth.user}
    >
      {renderModule()}
    </Layout>
  );
};

export default App;
