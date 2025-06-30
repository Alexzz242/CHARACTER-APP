import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Trophy, Flame, Star, History, RefreshCw } from 'lucide-react';

const HomeScreen = ({ 
  user, 
  promptService, 
  userService, 
  onStartChallenge, 
  onViewHistory, 
  onChangePersona 
}) => {
  const persona = promptService.getPersonaInfo(user.selectedPersona);
  const stats = userService.getPersonaStats(user.selectedPersona);
  const hasCompletedToday = userService.hasCompletedToday(user.selectedPersona);
  
  const xpToNextLevel = (stats.level * 100) - stats.xp;
  const currentLevelProgress = stats.xp % 100;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            PersonaForge
          </h1>
          <Button 
            variant="ghost" 
            onClick={onChangePersona}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Change Persona
          </Button>
        </div>

        {/* Persona Card */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardHeader className="text-center">
            <div className="text-8xl mb-4">{persona.avatar}</div>
            <CardTitle className="text-3xl text-white">{persona.name}</CardTitle>
            <p className="text-gray-400 text-lg">{persona.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                  <span className="text-2xl font-bold text-white">{stats.level}</span>
                </div>
                <p className="text-gray-400 text-sm">Level</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold text-white">{stats.xp}</span>
                </div>
                <p className="text-gray-400 text-sm">XP</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Flame className="w-6 h-6 text-orange-500 mr-2" />
                  <span className="text-2xl font-bold text-white">{stats.streak}</span>
                </div>
                <p className="text-gray-400 text-sm">Streak</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl mr-2">💎</span>
                  <span className="text-2xl font-bold text-white">{user.gems}</span>
                </div>
                <p className="text-gray-400 text-sm">Gems</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Level {stats.level} Progress</span>
                <span className="text-sm text-gray-400">{xpToNextLevel} XP to next level</span>
              </div>
              <Progress value={currentLevelProgress} className="h-3" />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {persona.categories.map((category) => (
                <Badge 
                  key={category}
                  variant="secondary"
                  className="bg-red-600/20 text-red-400 border border-red-600/30"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {!hasCompletedToday ? (
                <Button 
                  onClick={onStartChallenge}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-4 text-lg"
                >
                  Start Today's Challenge
                </Button>
              ) : (
                <div className="text-center py-4">
                  <div className="text-green-500 text-lg font-semibold mb-2">
                    ✅ Challenge Completed Today!
                  </div>
                  <p className="text-gray-400">Come back tomorrow for your next challenge</p>
                </div>
              )}
              
              <Button 
                onClick={onViewHistory}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <History className="w-4 h-4 mr-2" />
                View History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Quote/Motivation */}
        <Card className="bg-gray-800/30 border-gray-700">
          <CardContent className="p-6 text-center">
            <p className="text-lg italic text-gray-300 mb-2">
              "The things you own end up owning you."
            </p>
            <p className="text-sm text-gray-500">- {persona.name}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;

