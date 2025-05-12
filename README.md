# Airline HRMS Onboarding Application

A simple HRMS onboarding application for an airline company that simulates the onboarding workflow for new employees.

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

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js + Express
- Mock data storage: In-memory arrays

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