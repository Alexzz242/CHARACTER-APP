import React from 'react';

const TestComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          PersonaForge Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4">Card 1</h2>
            <p className="text-gray-300">This is a test card to verify Tailwind CSS is working.</p>
            <button className="mt-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
              Test Button
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4">Card 2</h2>
            <p className="text-gray-300">Another test card with different styling.</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm border border-blue-600/30">
                Physical
              </span>
              <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm border border-green-600/30">
                Mental
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400 text-lg">
            If you can see this styled content, Tailwind CSS is working correctly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestComponent; 