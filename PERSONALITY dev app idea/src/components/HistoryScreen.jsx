import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, Camera, Mic, Type, Trophy } from 'lucide-react';

const HistoryScreen = ({ submissionService, promptService, onBack }) => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const history = submissionService.getSubmissionHistory();
    setSubmissions(history);
  }, [submissionService]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProofIcon = (proofType) => {
    switch (proofType) {
      case 'photo':
        return <Camera className="w-4 h-4" />;
      case 'audio':
        return <Mic className="w-4 h-4" />;
      default:
        return <Type className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      physical: 'bg-red-600/20 text-red-400 border-red-600/30',
      mental: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
      social: 'bg-green-600/20 text-green-400 border-green-600/30',
      productive: 'bg-purple-600/20 text-purple-400 border-purple-600/30'
    };
    return colors[category?.toLowerCase()] || 'bg-gray-600/20 text-gray-400 border-gray-600/30';
  };

  const renderProofPreview = (submission) => {
    if (submission.proofType === 'text') {
      return (
        <p className="text-gray-300 text-sm line-clamp-3">
          {submission.proof}
        </p>
      );
    } else if (submission.proofType === 'photo' && submission.proof?.data) {
      return (
        <img 
          src={submission.proof.data} 
          alt="Proof" 
          className="w-full h-32 object-cover rounded-lg"
        />
      );
    } else if (submission.proofType === 'audio' && submission.proof?.data) {
      return (
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <Mic className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Audio Recording</p>
          <p className="text-xs text-gray-500">{submission.proof.name}</p>
        </div>
      );
    }
    return <p className="text-gray-500 text-sm">No proof available</p>;
  };

  if (selectedSubmission) {
    const persona = promptService.getPersonaInfo(selectedSubmission.personaId);
    
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedSubmission(null)}
              className="text-gray-400 hover:text-white mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-white">Submission Details</h1>
          </div>

          {/* Submission Detail Card */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{persona.avatar}</div>
                <div>
                  <CardTitle className="text-xl text-white">{persona.name}</CardTitle>
                  <p className="text-gray-400">{formatDate(selectedSubmission.timestamp)}</p>
                </div>
              </div>
              <Badge className={getCategoryColor(selectedSubmission.category)}>
                {selectedSubmission.category}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Challenge */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Challenge</h3>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <p className="text-gray-300">"{selectedSubmission.task}"</p>
                  </div>
                </div>

                {/* Proof */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">Your Proof</h3>
                    <div className="flex items-center gap-1 text-gray-400">
                      {getProofIcon(selectedSubmission.proofType)}
                      <span className="text-sm capitalize">{selectedSubmission.proofType}</span>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    {renderProofPreview(selectedSubmission)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-gray-400 hover:text-white mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Challenge History</h1>
        </div>

        {/* Stats Summary */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{submissions.length}</div>
                <p className="text-gray-400 text-sm">Total Challenges</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {submissions.filter(s => s.category === 'physical').length}
                </div>
                <p className="text-gray-400 text-sm">Physical</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {submissions.filter(s => s.category === 'mental').length}
                </div>
                <p className="text-gray-400 text-sm">Mental</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {submissions.filter(s => s.category === 'social' || s.category === 'productive').length}
                </div>
                <p className="text-gray-400 text-sm">Social/Productive</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions List */}
        {submissions.length === 0 ? (
          <Card className="bg-gray-800/30 border-gray-700">
            <CardContent className="p-12 text-center">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Challenges Completed Yet</h3>
              <p className="text-gray-500">Start your first challenge to see your history here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => {
              const persona = promptService.getPersonaInfo(submission.personaId);
              return (
                <Card 
                  key={submission.id}
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{persona.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-white">{persona.name}</h3>
                          <Badge className={getCategoryColor(submission.category)}>
                            {submission.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-400 ml-auto">
                            {getProofIcon(submission.proofType)}
                            <Calendar className="w-4 h-4 ml-2" />
                            <span className="text-sm">{formatDate(submission.timestamp)}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                          "{submission.task}"
                        </p>
                        {submission.proofType === 'text' && (
                          <p className="text-gray-400 text-xs line-clamp-1">
                            {submission.proof}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;

