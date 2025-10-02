# SabbathTheologyLink - WARP Agent Documentation

This file provides guidance to WARP (warp.dev) agents when working with this repository.

## Project Overview

SabbathTheologyLink is a Next.js 15 web application that provides Sabbath School lessons and quizzes from a Seventh-day Adventist (SDA) perspective. The project combines modern web technologies with Firebase backend services to create an educational platform for Bible study.

## Project Architecture

This is a full-stack application built with Firebase DataConnect and Next.js:

- **Frontend**: Next.js 15 app in `web-app/` directory with React, TypeScript, and Tailwind CSS
- **Backend**: Firebase DataConnect service configured in `dataconnect/` directory 
- **Database**: Cloud Firestore (serverless) via Firebase DataConnect
- **Schema**: GraphQL schema for SDA theological content with Users, Modules, Quizzes, and Progress tracking
- **Authentication**: Firebase Auth with email/password and React Context
- **Preview Mode**: App can run without Firebase credentials for development

### Key Directories

```
SabbathTheologyLink/
├── web-app/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   ├── components/        # React components
│   │   │   ├── auth/         # Authentication components (LoginForm, SignupForm, UserHeader)
│   │   │   ├── layout/       # Layout components (Navigation, AppLayout)
│   │   │   └── modules/      # Module/lesson components (ModulesPage)
│   │   ├── contexts/         # React Context providers (AuthContext)
│   │   ├── lib/              # Utility libraries and configs (firebase.ts)
│   │   └── types/            # TypeScript type definitions
│   ├── public/               # Static assets
│   └── package.json          # Frontend dependencies
├── dataconnect/              # Firebase DataConnect backend
│   ├── schema/
│   │   └── schema.gql        # GraphQL schema definition
│   ├── connector/
│   │   ├── queries.gql       # GraphQL queries
│   │   └── mutations.gql     # GraphQL mutations
│   └── dataconnect.yaml     # DataConnect configuration
├── firebase.json             # Firebase project configuration
├── WARP.md                   # This file - Agent documentation
└── README.md                 # Project documentation
```

## Build and Development Commands

### Initial Setup
```bash
# Install frontend dependencies
cd web-app
npm install

# Install Firebase CLI globally (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase DataConnect (if needed)
firebase init dataconnect
```

### Frontend Development (run in `web-app/` directory)
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Firebase DataConnect Commands
```bash
# Deploy DataConnect schema and operations
firebase deploy --only dataconnect

# Generate DataConnect SDK (from web-app directory)
cd web-app
npm run build-dataconnect

# Start local DataConnect emulator
firebase emulators:start --only dataconnect
```

### Testing
```bash
# Run tests (when implemented)
cd web-app
npm test

# Run tests in watch mode
npm run test:watch

# Run end-to-end tests (when implemented)
npm run test:e2e
```

## Environment Configuration

### Required Environment Variables
Create `web-app/.env.local` with Firebase configuration:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# DataConnect Configuration
NEXT_PUBLIC_DATACONNECT_CONNECTOR_ID=your_connector_id
NEXT_PUBLIC_DATACONNECT_SERVICE_ID=your_service_id
```

### Preview Mode
The application supports a **preview mode** when environment variables are missing or invalid. In this mode:
- Firebase authentication is disabled
- Users cannot log in/sign up
- UI components render in a demo state
- No backend connections are attempted
- Run `npm run dev` to preview the app without Firebase setup

### Firebase Hosting
```bash
# Deploy to Firebase Hosting
firebase deploy --only hosting

# Serve locally
firebase serve

# Deploy all services
firebase deploy
```

### Full Stack Development
```bash
# Start all Firebase emulators (from root)
firebase emulators:start

# Then in web-app/ directory
npm run dev
```

## Database Schema

The schema implements a comprehensive SDA Bible study platform with:

### Entities
- **User**: User profiles with SDA preferences and Firebase Auth integration
- **Module**: Bible lessons, stories, and posts with metadata (title, content, difficulty, tags, memory verses)
- **Quiz**: Assessment quizzes linked to modules with scoring and timing
- **Question**: Individual quiz questions with multiple choice answers and explanations
- **UserProgress**: Tracks user completion and progress through modules
- **QuizAttempt**: Records quiz attempts, scores, and completion times
- **UserSettings**: User preferences and configurations (theme, Bible version, notifications)

### Key Relationships
- Users have many UserProgress records
- Modules have many Quizzes
- Quizzes have many Questions
- Users have many QuizAttempts
- QuizAttempts belong to Quizzes and Users

## Current Implementation Status

### ✓ Completed
- Project structure and Next.js 15 setup with App Router
- Firebase DataConnect integration and GraphQL schema
- GraphQL operations (queries/mutations) and SDK generation
- Authentication system with Firebase Auth
- React Context providers for auth state management
- Authentication components (LoginForm, SignupForm, UserHeader)
- Main navigation and app layout (Navigation, AppLayout)
- Modules page with responsive grid layout and filtering
- Preview mode for development without Firebase credentials
- ESLint configuration and build optimization

### 🚧 In Progress / TODO
- Quizzes page implementation
- My Progress page with user analytics dashboard
- Admin panel for content management
- Detailed module content pages with lesson viewer
- Quiz interaction and submission system
- User progress tracking integration with DataConnect
- Responsive design improvements and mobile optimization
- Accessibility enhancements (ARIA labels, keyboard navigation)
- Offline support and PWA features
- Comprehensive testing implementation

### 📋 Future Enhancements
- Social features (comments, sharing, discussion forums)
- Advanced analytics and reporting for educators
- Multi-language support for global SDA community
- Push notifications for lesson reminders
- Advanced content management system
- API rate limiting and enhanced security measures

## Key Files and Components

### Important Configuration Files
- `web-app/package.json` - Frontend dependencies and scripts
- `web-app/next.config.js` - Next.js configuration
- `web-app/tailwind.config.js` - Tailwind CSS configuration
- `firebase.json` - Firebase project settings
- `dataconnect/dataconnect.yaml` - DataConnect configuration

### Key Components
- `src/contexts/AuthContext.tsx` - Authentication context and Firebase integration
- `src/components/layout/Navigation.tsx` - Main navigation component
- `src/components/layout/AppLayout.tsx` - App wrapper with header/footer
- `src/components/modules/ModulesPage.tsx` - Modules listing page
- `src/components/auth/LoginForm.tsx` - User login component
- `src/components/auth/SignupForm.tsx` - User registration component
- `src/components/auth/UserHeader.tsx` - User profile header
- `src/lib/firebase.ts` - Firebase configuration and initialization

### Documentation
- `README.md` - Main project documentation and setup instructions
- `WARP.md` - This file - Agent documentation and guidelines
- `web-app/README.md` - Frontend-specific documentation

## Deployment

### Vercel Deployment (Recommended for Next.js)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from web-app directory
cd web-app
vercel

# Set environment variables in Vercel dashboard
# Deploy production
vercel --prod
```

### Firebase Hosting
```bash
# Build the app
cd web-app
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for Next.js and React
- Tailwind CSS for styling with SDA color scheme
- Component-based architecture with clear separation of concerns
- React Context API for state management

### Naming Conventions
- Components: PascalCase (e.g., `ModulesPage.tsx`)
- Files: camelCase for utilities, PascalCase for components
- GraphQL operations: camelCase
- CSS classes: Tailwind utility classes

## Common Issues and Solutions

### Build Errors
- **Firebase initialization errors**: Check environment variables and ensure Firebase project is configured
- **DataConnect SDK issues**: Run `npm run build-dataconnect` to regenerate SDK
- **TypeScript errors**: Check imports and type definitions

### Authentication Issues
- **Preview mode**: App runs without authentication when Firebase config is missing
- **Login failures**: Verify Firebase Auth is enabled and configured properly
- **CORS errors**: Check Firebase Auth domain configuration

## WARP Agent Instructions

When working with this codebase:

1. **Always check the current working directory** - the project has nested structure with `web-app/` containing the Next.js app
2. **Use relative paths** for files within the project structure
3. **Check environment setup** before running commands - app supports preview mode without Firebase credentials
4. **Respect the preview mode** - app can run without Firebase credentials for development
5. **Follow the existing patterns** - maintain consistency with current SDA-themed architecture
6. **Update this documentation** when making significant changes
7. **Test authentication flows** both in preview and connected modes
8. **Use todo lists for complex tasks** - create structured plans for multi-step implementations

### Common Tasks for Agents
- **Add new pages**: Create in `web-app/src/app/` following Next.js App Router conventions
- **Add new components**: Place in appropriate `web-app/src/components/` subdirectory
- **Update database schema**: Modify `dataconnect/schema/schema.gql` and redeploy
- **Add new queries/mutations**: Update GraphQL files and regenerate SDK
- **Style components**: Use Tailwind classes and maintain SDA branding (blue/gold color scheme)
- **Handle authentication**: Use AuthContext and respect preview mode for development

### Key Technologies
- **Frontend**: Next.js 15 with App Router, React, TypeScript, Tailwind CSS
- **Backend**: Firebase DataConnect with GraphQL schema
- **Database**: Cloud Firestore (serverless)
- **Authentication**: Firebase Auth with React Context integration
- **Development**: Preview mode allows running without Firebase credentials

Remember to always test changes locally before suggesting deployment and ensure the preview mode still works for development without credentials.
