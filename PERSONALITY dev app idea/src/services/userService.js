// userService.js - Handles user data management
export class UserService {
  constructor() {
    this.storageKey = 'persona_forge_user';
    this.initializeUser();
  }

  initializeUser() {
    const existingUser = this.getUser();
    if (!existingUser) {
      const defaultUser = {
        selectedPersona: null,
        personas: {
          tyler_durden: { level: 1, xp: 0, streak: 0, completedDates: [] },
          batman: { level: 1, xp: 0, streak: 0, completedDates: [] },
          patrick_bateman: { level: 1, xp: 0, streak: 0, completedDates: [] },
          dexter_morgan: { level: 1, xp: 0, streak: 0, completedDates: [] }
        },
        gems: 0,
        lastCompletedDate: null
      };
      this.saveUser(defaultUser);
    }
  }

  getUser() {
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }

  saveUser(userData) {
    localStorage.setItem(this.storageKey, JSON.stringify(userData));
  }

  selectPersona(personaId) {
    const user = this.getUser();
    user.selectedPersona = personaId;
    this.saveUser(user);
  }

  completeTask(personaId, xpReward = 10, gemReward = 5) {
    const user = this.getUser();
    const today = new Date().toDateString();
    
    // Update persona stats
    user.personas[personaId].xp += xpReward;
    user.personas[personaId].completedDates.push(today);
    
    // Update streak
    if (user.lastCompletedDate !== today) {
      user.personas[personaId].streak += 1;
      user.lastCompletedDate = today;
    }
    
    // Add gems
    user.gems += gemReward;
    
    // Check for level up
    const currentLevel = user.personas[personaId].level;
    const newLevel = Math.floor(user.personas[personaId].xp / 100) + 1;
    if (newLevel > currentLevel) {
      user.personas[personaId].level = newLevel;
    }
    
    this.saveUser(user);
    return { leveledUp: newLevel > currentLevel, newLevel };
  }

  hasCompletedToday(personaId) {
    const user = this.getUser();
    const today = new Date().toDateString();
    return user.personas[personaId].completedDates.includes(today);
  }

  getPersonaStats(personaId) {
    const user = this.getUser();
    return user.personas[personaId];
  }
}

