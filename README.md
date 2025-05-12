# HRM Airlines

Human Resource Management System for Airlines

## Overview

This is a full-stack web application built for airline HR departments to manage employee onboarding and human resources management processes. The application includes:

- Candidate management
- Employee onboarding workflow
- Asset assignment tracking
- Feedback and check-in system

## Tech Stack

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express
- **Deployment**: Vercel

## Project Structure

```
hrm_airlines/
├── frontend/       # React application
├── backend/        # Express API
├── vercel.json     # Vercel deployment configuration
├── package.json    # Root package.json for workspace management
└── README.md       # Project documentation
```

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Run development servers:
   ```
   npm run dev
   ```

   This will start both the frontend (on port 3000) and backend (on port 5000) in development mode.

## Deployment to Vercel

This application is configured for deployment to Vercel.

### Manual Deployment

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```
   vercel
   ```

### Automatic Deployment

The application is configured to be deployed automatically when pushed to the GitHub repository.

## Environment Variables

For production deployment, the following environment variables should be set in Vercel:

- `NODE_ENV` - Set to "production"
- `PORT` - (Optional) The port the server will run on (defaults to Vercel's settings)

## License

This project is proprietary and confidential.

## Features

- View list of candidates
- Add new candidates
- Trigger onboarding process
- View candidate details and onboarding status
- Simulated automation for:
  - Email assignment
  - Employee ID generation
  - IT asset assignment
  - Background check

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## API Endpoints

- `GET /candidates` - Get all candidates
- `POST /candidates` - Add a new candidate
- `POST /onboard/:id` - Start onboarding process for a candidate
- `GET /status/:id` - Get onboarding status for a candidate

## Usage

1. Open the application in your browser
2. Use the "Add Candidate" button to add new candidates
3. View the list of candidates on the home page
4. Click "View" to see candidate details
5. Use "Start Onboarding" to begin the onboarding process
6. Monitor the onboarding progress in the candidate detail view 