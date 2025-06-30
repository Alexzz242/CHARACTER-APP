// promptService.js - Handles challenge prompt management
export class PromptService {
  constructor() {
    this.prompts = null;
    this.loadPrompts();
  }

  async loadPrompts() {
    try {
      const response = await fetch('/prompts.json');
      this.prompts = await response.json();
    } catch (error) {
      console.error('Failed to load prompts:', error);
      // Fallback prompts
      this.prompts = {
        personas: {
          tyler_durden: [
            {
              level: 1,
              category: "physical",
              task: "Do 15 burpees. No mercy."
            },
            {
              level: 1,
              category: "social",
              task: "Start a conversation with a stranger. Report back."
            }
          ],
          batman: [
            {
              level: 1,
              category: "mental",
              task: "Plan your next 5 moves. Write them down."
            },
            {
              level: 1,
              category: "physical",
              task: "Hold a plank for 2 minutes. Stay vigilant."
            }
          ],
          patrick_bateman: [
            {
              level: 1,
              category: "productive",
              task: "Optimize your morning routine for maximum efficiency."
            },
            {
              level: 1,
              category: "physical",
              task: "Complete 100 push-ups. Maintain perfect form."
            }
          ],
          dexter_morgan: [
            {
              level: 1,
              category: "mental",
              task: "Analyze a complex problem and outline a step-by-step solution."
            },
            {
              level: 1,
              category: "productive",
              task: "Organize your digital files. Eliminate all unnecessary clutter."
            }
          ]
        }
      };
    }
  }

  getDailyChallenge(personaId, level = 1) {
    if (!this.prompts) {
      return { task: "Loading challenge...", category: "general" };
    }

    const personaPrompts = this.prompts.personas[personaId] || [];
    const levelPrompts = personaPrompts.filter(p => p.level === level);
    
    if (levelPrompts.length === 0) {
      // Fallback to level 1 if no prompts for current level
      const fallbackPrompts = personaPrompts.filter(p => p.level === 1);
      if (fallbackPrompts.length === 0) {
        return { task: "No challenges available", category: "general" };
      }
      return fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)];
    }

    // Return random challenge from available prompts for the level
    return levelPrompts[Math.floor(Math.random() * levelPrompts.length)];
  }

  getPersonaInfo(personaId) {
    const personaData = {
      tyler_durden: {
        name: "Tyler Durden",
        description: "Rude, radical",
        categories: ["Physical", "Social"],
        avatar: "🥊"
      },
      batman: {
        name: "Batman",
        description: "Stoic, wise",
        categories: ["Mental", "Physical"],
        avatar: "🦇"
      },
      patrick_bateman: {
        name: "Patrick Bateman",
        description: "Perfectionist",
        categories: ["Productive", "Physical"],
        avatar: "💼"
      },
      dexter_morgan: {
        name: "Dexter Morgan",
        description: "Calm, clinical",
        categories: ["Mental", "Productive"],
        avatar: "🔬"
      }
    };

    return personaData[personaId] || { name: "Unknown", description: "", categories: [], avatar: "❓" };
  }
}

