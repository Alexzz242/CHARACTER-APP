import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserService } from '../services/userService';
import { PromptService } from '../services/promptService';
import { SubmissionService } from '../services/submissionService';
import PersonaSelection from './PersonaSelection';
import HomeScreen from './HomeScreen';
import ChallengeScreen from './ChallengeScreen';
import ResultScreen from './ResultScreen';
import HistoryScreen from './HistoryScreen';
import './App.css';

function App() {
  const [userService] = useState(new UserService());
  const [promptService] = useState(new PromptService());
  const [submissionService] = useState(new SubmissionService());
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [completionResult, setCompletionResult] = useState(null);

  useEffect(() => {
    const userData = userService.getUser();
    console.log('User data loaded:', userData);
    setUser(userData);
  }, [userService]);

  const handlePersonaSelect = (personaId) => {
    console.log('Selecting persona:', personaId);
    userService.selectPersona(personaId);
    const updatedUser = userService.getUser();
    setUser(updatedUser);
    setCurrentScreen('home');
  };

  const handleStartChallenge = () => {
    if (user?.selectedPersona) {
      const personaStats = userService.getPersonaStats(user.selectedPersona);
      const challenge = promptService.getDailyChallenge(user.selectedPersona, personaStats.level);
      setCurrentChallenge(challenge);
      setCurrentScreen('challenge');
    }
  };

  const handleChallengeComplete = async (proof, proofType) => {
    if (user?.selectedPersona && currentChallenge) {
      // Save submission
      const submission = {
        personaId: user.selectedPersona,
        task: currentChallenge.task,
        category: currentChallenge.category,
        proof,
        proofType
      };
      
      submissionService.saveSubmission(submission);
      
      // Update user stats
      const result = userService.completeTask(user.selectedPersona);
      const updatedUser = userService.getUser();
      setUser(updatedUser);
      setCompletionResult(result);
      setCurrentScreen('result');
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setCurrentChallenge(null);
    setCompletionResult(null);
  };

  const handleViewHistory = () => {
    setCurrentScreen('history');
  };

  console.log('Current user state:', user);
  console.log('Current screen:', currentScreen);

  if (!user) {
    console.log('Showing loading screen');
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-2xl">Loading...</div>;
  }

  if (!user.selectedPersona) {
    console.log('Showing persona selection');
    return (
      <PersonaSelection 
        promptService={promptService}
        onPersonaSelect={handlePersonaSelect}
      />
    );
  }

  console.log('Showing main app with persona:', user.selectedPersona);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {currentScreen === 'home' && (
        <HomeScreen
          user={user}
          promptService={promptService}
          userService={userService}
          onStartChallenge={handleStartChallenge}
          onViewHistory={handleViewHistory}
          onChangePersona={() => {
            userService.selectPersona(null);
            const updatedUser = userService.getUser();
            setUser(updatedUser);
          }}
        />
      )}
      
      {currentScreen === 'challenge' && currentChallenge && (
        <ChallengeScreen
          challenge={currentChallenge}
          persona={promptService.getPersonaInfo(user.selectedPersona)}
          onComplete={handleChallengeComplete}
          onBack={handleBackToHome}
        />
      )}
      
      {currentScreen === 'result' && completionResult && (
        <ResultScreen
          result={completionResult}
          persona={promptService.getPersonaInfo(user.selectedPersona)}
          userStats={userService.getPersonaStats(user.selectedPersona)}
          onContinue={handleBackToHome}
        />
      )}
      
      {currentScreen === 'history' && (
        <HistoryScreen
          submissionService={submissionService}
          promptService={promptService}
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;

