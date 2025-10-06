import React, { useEffect, useState } from 'react';
import config from '../constants';

const DashboardPage = ({ chef, recipes, onLogout, onLoadRecipes, onCreateRecipe }) => {
  const [newRecipe, setNewRecipe] = useState({ 
    title: '', 
    ingredients: '', 
    instructions: '', 
    prepTime: 0, 
    cookTime: 0, 
    difficulty: 'Medium'
  });

  useEffect(() => {
    if (chef) {
        onLoadRecipes();
    }
  }, [chef]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    await onCreateRecipe({
        ...newRecipe,
        prepTime: parseInt(newRecipe.prepTime, 10),
        cookTime: parseInt(newRecipe.cookTime, 10)
    });
    setNewRecipe({ title: '', ingredients: '', instructions: '', prepTime: 0, cookTime: 0, difficulty: 'Medium' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ChefPortfolio</h1>
            <p className="text-sm text-gray-500">Welcome back, {chef?.name}!</p>
          </div>
          <div className="flex items-center space-x-4">
             <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New Recipe Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a New Recipe</h2>
          <form onSubmit={handleCreateRecipe} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" id="title" value={newRecipe.title} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients</label>
              <textarea name="ingredients" id="ingredients" rows="5" value={newRecipe.ingredients} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
              <textarea name="instructions" id="instructions" rows="5" value={newRecipe.instructions} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div>
              <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700">Prep Time (mins)</label>
              <input type="number" name="prepTime" id="prepTime" value={newRecipe.prepTime} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
             <div>
              <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700">Cook Time (mins)</label>
              <input type="number" name="cookTime" id="cookTime" value={newRecipe.cookTime} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
              <select name="difficulty" id="difficulty" value={newRecipe.difficulty} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end">
               <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add Recipe</button>
            </div>
          </form>
        </div>

        {/* Recipes List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Recipe Collection</h2>
          {recipes.length === 0 ? (
            <p className="text-gray-500">You haven't added any recipes yet. Use the form above to get started!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map(recipe => (
                <div key={recipe.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  {recipe.photo?.thumbnail?.url && <img src={recipe.photo.thumbnail.url} alt={recipe.title} className="w-full h-48 object-cover" />}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{recipe.title}</h3>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>Prep: {recipe.prepTime}m</span>
                        <span>Cook: {recipe.cookTime}m</span>
                        <span className="font-medium text-gray-700">{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
