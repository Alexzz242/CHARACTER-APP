// submissionService.js - Handles task submission and proof storage
export class SubmissionService {
  constructor() {
    this.storageKey = 'persona_forge_submissions';
    this.initializeStorage();
  }

  initializeStorage() {
    const existingSubmissions = this.getSubmissions();
    if (!existingSubmissions) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getSubmissions() {
    const submissions = localStorage.getItem(this.storageKey);
    return submissions ? JSON.parse(submissions) : [];
  }

  saveSubmission(submission) {
    const submissions = this.getSubmissions();
    const newSubmission = {
      id: Date.now().toString(),
      personaId: submission.personaId,
      task: submission.task,
      category: submission.category,
      proof: submission.proof,
      proofType: submission.proofType, // 'text', 'photo', 'audio'
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };
    
    submissions.unshift(newSubmission); // Add to beginning of array
    localStorage.setItem(this.storageKey, JSON.stringify(submissions));
    return newSubmission;
  }

  getSubmissionHistory(limit = 50) {
    const submissions = this.getSubmissions();
    return submissions.slice(0, limit);
  }

  getSubmissionsByPersona(personaId) {
    const submissions = this.getSubmissions();
    return submissions.filter(s => s.personaId === personaId);
  }

  getTodaySubmissions() {
    const submissions = this.getSubmissions();
    const today = new Date().toDateString();
    return submissions.filter(s => s.date === today);
  }

  // Handle file uploads (photos/audio)
  async handleFileUpload(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          data: e.target.result,
          name: file.name,
          type: file.type,
          size: file.size
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Validate submission based on type
  validateSubmission(proof, proofType) {
    switch (proofType) {
      case 'text':
        return proof && proof.trim().length > 0;
      case 'photo':
        return proof && proof.data;
      case 'audio':
        return proof && proof.data;
      default:
        return false;
    }
  }
}

