import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trophy, Star, Flame, Sparkles } from 'lucide-react';

const ResultScreen = ({ result, persona, userStats, onContinue }) => {
  const rewards = [
    { icon: Star, label: 'XP Gained', value: '+10', color: 'text-blue-500' },
    { icon: Sparkles, label: 'Gems Earned', value: '+5', color: 'text-purple-500' },
    { icon: Flame, label: 'Streak', value: userStats.streak, color: 'text-orange-500' }
  ];

  const motivationalMessages = {
    tyler_durden: [
      "You're one step closer to becoming who you're supposed to be.",
      "The things you own end up owning you. But discipline? That's yours forever.",
      "You met me at a very strange time in my life. And you're getting stronger."
    ],
    batman: [
      "It's not who I am underneath, but what I do that defines me. Well done.",
      "Why do we fall? So we can learn to pick ourselves up.",
      "You have proven yourself. The night is proud."
    ],
    patrick_bateman: [
      "Excellence is not a skill, it's an attitude. You're developing both.",
      "Perfection is achieved through discipline and attention to detail.",
      "Your commitment to improvement is... impressive."
    ],
    dexter_morgan: [
      "Methodical. Precise. Effective. You're learning the fundamentals.",
      "Control is an illusion, but discipline is real. You're building both.",
      "Every completed task is evidence of your evolution."
    ]
  };

  const getRandomMessage = (personaId) => {
    const messages = motivationalMessages[personaId] || motivationalMessages.tyler_durden;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation Area */}
        <div className="text-center mb-8">
          <div className="relative">
            <div className="text-8xl mb-4 animate-bounce">🎉</div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl"></div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Challenge Complete!</h1>
          <p className="text-gray-400 text-lg">Another step forward in your journey</p>
        </div>

        {/* Results Card */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{persona.avatar}</div>
            <CardTitle className="text-2xl text-white">{persona.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Level Up Notification */}
            {result.leveledUp && (
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-600/30 rounded-lg p-4 mb-6 text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-yellow-400 mb-1">LEVEL UP!</h3>
                <p className="text-gray-300">You've reached Level {result.newLevel}</p>
              </div>
            )}

            {/* Rewards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {rewards.map((reward, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <reward.icon className={`w-6 h-6 ${reward.color} mr-2`} />
                    <span className="text-xl font-bold text-white">{reward.value}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{reward.label}</p>
                </div>
              ))}
            </div>

            {/* Current Stats */}
            <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Your Progress</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Level</p>
                  <p className="text-2xl font-bold text-white">{userStats.level}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total XP</p>
                  <p className="text-2xl font-bold text-white">{userStats.xp}</p>
                </div>
              </div>
            </div>

            {/* Motivational Message */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-6 mb-6">
              <p className="text-lg italic text-gray-300 text-center leading-relaxed">
                "{getRandomMessage(persona.name.toLowerCase().replace(' ', '_'))}"
              </p>
              <p className="text-sm text-gray-500 text-center mt-2">- {persona.name}</p>
            </div>

            {/* Continue Button */}
            <Button 
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 text-lg"
            >
              Continue Your Journey
            </Button>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gray-800/30 border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-gray-400 text-sm">
              Come back tomorrow for your next challenge and keep building your character.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultScreen;

