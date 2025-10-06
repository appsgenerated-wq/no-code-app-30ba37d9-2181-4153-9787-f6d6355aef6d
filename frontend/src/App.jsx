import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService';
import config from './constants';
import './index.css';

function App() {
  const [currentChef, setCurrentChef] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ baseURL: config.BACKEND_URL, appId: config.APP_ID });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful. Checking auth status...');
        try {
          const chef = await manifest.from('Chef').me();
          setCurrentChef(chef);
          setCurrentScreen('dashboard');
        } catch (error) {
          console.log('No active session found.');
          setCurrentChef(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const chef = await manifest.from('Chef').me();
      setCurrentChef(chef);
      setCurrentScreen('dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentChef(null);
    setRecipes([]);
    setCurrentScreen('landing');
  };

  const loadRecipes = async () => {
    try {
      const response = await manifest.from('Recipe').find({ 
        include: ['author'],
        sort: { createdAt: 'desc' }
      });
      setRecipes(response.data);
    } catch (err) {
      console.error('Failed to load recipes:', err);
    }
  };

  const createRecipe = async (recipeData) => {
    try {
      const newRecipe = await manifest.from('Recipe').create(recipeData);
      setRecipes([newRecipe, ...recipes]);
    } catch (err) {
      console.error('Failed to create recipe:', err);
      alert('Failed to create recipe. Please check the form and try again.');
    }
  };
  
  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <p className="text-lg font-semibold text-gray-700">Loading ChefPortfolio...</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 text-xs font-medium">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`${backendConnected ? 'text-gray-700' : 'text-red-700'}`}>
          {backendConnected ? 'Backend Connected' : 'Connection Failed'}
        </span>
      </div>
      
      {currentScreen === 'landing' ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <DashboardPage 
          chef={currentChef} 
          recipes={recipes} 
          onLogout={handleLogout} 
          onLoadRecipes={loadRecipes}
          onCreateRecipe={createRecipe}
        />
      )}
    </div>
  );
}

export default App;
