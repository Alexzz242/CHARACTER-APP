# PersonaForge - Character Building App

PersonaForge is a React-based web application where users are guided by fictional character mentors who deliver daily challenges to build character across four life areas: physical, mental, social, and productive.

## Features

### Core Functionality
- **Persona Selection**: Choose from 4 unique mentors (Tyler Durden, Batman, Patrick Bateman, Dexter Morgan)
- **Daily Challenges**: Receive personalized 5-minute challenges based on your selected persona
- **Progress Tracking**: XP, levels, streaks, and gems system
- **Proof Submission**: Submit text, photo, or audio proof of challenge completion
- **Challenge History**: View all completed challenges with detailed records

### Personas
- **Tyler Durden** (Rude, radical): Physical & Social challenges
- **Batman** (Stoic, wise): Mental & Physical challenges  
- **Patrick Bateman** (Perfectionist): Productive & Physical challenges
- **Dexter Morgan** (Calm, clinical): Mental & Productive challenges

## Technology Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **Storage**: Local Storage (localStorage)
- **Desktop**: Electron (for desktop app packaging)

## Getting Started

### Prerequisites
- Node.js 20.18.0 or higher
- pnpm package manager

### Installation

1. Clone or extract the project files
2. Navigate to the project directory:
   ```bash
   cd persona-forge
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Application

#### Web Version
Start the development server:
```bash
pnpm run dev
```
The app will be available at `http://localhost:5173`

#### Desktop Version (Electron)
Start both the web server and Electron app:
```bash
pnpm run electron-dev
```

## Project Structure

```
persona-forge/
├── public/
│   └── prompts.json          # Challenge data
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   ├── PersonaSelection.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── ChallengeScreen.jsx
│   │   ├── ResultScreen.jsx
│   │   └── HistoryScreen.jsx
│   ├── services/
│   │   ├── userService.js    # User data management
│   │   ├── promptService.js  # Challenge data management
│   │   └── submissionService.js # Submission handling
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Entry point
├── main.js                   # Electron main process
└── package.json
```

## How It Works

1. **Select a Persona**: Choose your character mentor from the available options
2. **Daily Challenge**: Receive a unique challenge based on your persona's specialty areas
3. **5-Minute Timer**: Complete the challenge within the time limit
4. **Submit Proof**: Provide evidence of completion via text, photo, or audio
5. **Earn Rewards**: Gain XP, gems, and maintain your streak
6. **Level Up**: Progress through levels to unlock harder challenges

## Data Storage

All user data is stored locally in the browser's localStorage:
- User progress and stats
- Challenge submissions and history
- Persona selection and preferences

## Future Enhancements

The current version is a local MVP. Future versions could include:
- Cloud sync with Firebase
- Mobile app with React Native
- Push notifications
- Subscription features
- Additional personas and challenges

## Development Notes

- The app uses a service-based architecture for data management
- All UI components are built with Tailwind CSS and shadcn/ui
- Challenge data is loaded from a JSON file for easy modification
- The app is fully responsive and works on desktop and mobile browsers

## License

This is a personal project built as a first version MVP.

