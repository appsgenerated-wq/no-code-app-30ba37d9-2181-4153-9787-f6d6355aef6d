import React, { useState } from 'react';
import config from '../constants';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('chef@manifest.build');
  const [password, setPassword] = useState('password');

  const handleDemoLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full p-4 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <h1 className="text-2xl font-bold text-gray-900">ChefPortfolio</h1>
            <a 
                href={`${config.BACKEND_URL}/admin`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Admin Panel
              </a>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Your Digital Recipe Book
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            ChefPortfolio is the ultimate platform for culinary professionals to create, manage, and share their signature recipes with the world. Built entirely on the Manifest backend.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-center text-gray-800">Login to Your Kitchen</h3>
                 <form onSubmit={handleDemoLogin} className="space-y-4">
                  <div>
                     <label htmlFor="email" className="text-sm font-medium text-gray-700 sr-only">Email</label>
                     <input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                     />
                  </div>
                  <div>
                     <label htmlFor="password" className="text-sm font-medium text-gray-700 sr-only">Password</label>
                     <input 
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                     />
                  </div>
                   <button 
                      type="submit"
                      className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Login / Try Demo
                    </button>
                    <p className="text-xs text-gray-500 text-center">Use demo credentials or sign up via the Admin Panel.</p>
                 </form>
            </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
