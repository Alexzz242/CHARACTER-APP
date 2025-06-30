import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ArrowLeft, Clock, Upload, Mic, Camera, Type } from 'lucide-react';

const ChallengeScreen = ({ challenge, persona, onComplete, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [proof, setProof] = useState('');
  const [proofType, setProofType] = useState('text');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProof(file);
    }
  };

  const handleSubmit = async () => {
    if (!proof && !selectedFile) {
      alert('Please provide proof of completion');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let submissionProof = proof;
      
      if (proofType === 'photo' || proofType === 'audio') {
        if (selectedFile) {
          // Convert file to base64 for storage
          const reader = new FileReader();
          reader.onload = (e) => {
            submissionProof = {
              data: e.target.result,
              name: selectedFile.name,
              type: selectedFile.type,
              size: selectedFile.size
            };
            onComplete(submissionProof, proofType);
          };
          reader.readAsDataURL(selectedFile);
          return;
        }
      }
      
      onComplete(submissionProof, proofType);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit proof. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      physical: 'bg-red-600/20 text-red-400 border-red-600/30',
      mental: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      social: 'bg-green-600/20 text-green-400 border-green-600/30',
      productive: 'bg-purple-600/20 text-purple-400 border-purple-600/30'
    };
    return colors[category.toLowerCase()] || 'bg-gray-600/20 text-gray-400 border-gray-600/30';
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-gray-400 hover:text-white mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Daily Challenge</h1>
        </div>

        {/* Persona & Challenge Card */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{persona.avatar}</div>
            <CardTitle className="text-2xl text-white">{persona.name}</CardTitle>
            <Badge className={`mx-auto ${getCategoryColor(challenge.category)}`}>
              {challenge.category}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900/50 p-6 rounded-lg mb-6">
              <p className="text-lg text-white font-medium text-center leading-relaxed">
                "{challenge.task}"
              </p>
            </div>

            {/* Timer */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-600 to-orange-600 rounded-full mb-4">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              
              {!isTimerActive && timeLeft === 5 * 60 && (
                <Button 
                  onClick={startTimer}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                >
                  Start Timer
                </Button>
              )}
              
              {isTimerActive && (
                <p className="text-gray-400">Timer is running...</p>
              )}
              
              {timeLeft === 0 && (
                <p className="text-green-400 font-semibold">Time's up! Submit your proof.</p>
              )}
            </div>

            {/* Proof Submission */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Submit Proof</h3>
              
              {/* Proof Type Selection */}
              <div className="flex gap-2 mb-4">
                <Button
                  variant={proofType === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProofType('text')}
                  className={proofType === 'text' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  <Type className="w-4 h-4 mr-2" />
                  Text
                </Button>
                <Button
                  variant={proofType === 'photo' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProofType('photo')}
                  className={proofType === 'photo' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Photo
                </Button>
                <Button
                  variant={proofType === 'audio' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProofType('audio')}
                  className={proofType === 'audio' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Audio
                </Button>
              </div>

              {/* Proof Input */}
              {proofType === 'text' && (
                <Textarea
                  placeholder="Describe how you completed the challenge..."
                  value={proof}
                  onChange={(e) => setProof(e.target.value)}
                  className="bg-gray-900/50 border-gray-600 text-white min-h-[120px]"
                />
              )}

              {(proofType === 'photo' || proofType === 'audio') && (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <Input
                    type="file"
                    accept={proofType === 'photo' ? 'image/*' : 'audio/*'}
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">
                      {selectedFile ? selectedFile.name : `Upload ${proofType}`}
                    </p>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || (!proof && !selectedFile)}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Complete Challenge'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChallengeScreen;

