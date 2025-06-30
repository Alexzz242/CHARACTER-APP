import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const PersonaSelection = ({ promptService, onPersonaSelect }) => {
  const personas = [
    'tyler_durden',
    'batman', 
    'patrick_bateman',
    'dexter_morgan'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            PersonaForge
          </h1>
          <p className="text-xl text-gray-300">
            Choose your mentor. Build your character.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((personaId) => {
            const persona = promptService.getPersonaInfo(personaId);
            return (
              <Card 
                key={personaId}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => onPersonaSelect(personaId)}
              >
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{persona.avatar}</div>
                  <CardTitle className="text-2xl text-white">{persona.name}</CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    {persona.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {persona.categories.map((category) => (
                      <span 
                        key={category}
                        className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-sm border border-red-600/30"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPersonaSelect(personaId);
                    }}
                  >
                    Choose {persona.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            Each persona will challenge you with unique tasks designed to build different aspects of your character.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonaSelection;

