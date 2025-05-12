const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// For local development, use port 5000
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data
let candidates = [];
let onboardingStatus = {};

// Helper functions
const generateEmployeeId = () => {
    return 'EMP' + Math.floor(1000 + Math.random() * 9000);
};

const generateEmail = (firstName, lastName) => {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@airline.com`;
};

const IT_ASSETS = [
    { type: 'laptop', model: 'MacBook Pro' },
    { type: 'laptop', model: 'Dell XPS' },
    { type: 'phone', model: 'iPhone 14' },
    { type: 'phone', model: 'Samsung Galaxy' }
];

const SOFTWARE_ACCESS = [
    { name: 'Sabre', type: 'Reservation System' },
    { name: 'Amadeus', type: 'Reservation System' },
    { name: 'Navitaire', type: 'Reservation System' },
    { name: 'Flight Operations System', type: 'Operations' },
    { name: 'Crew Management System', type: 'Operations' }
];

const ONBOARDING_STEPS = {
    selection: [
        { id: 'offer', name: 'Generate Offer Letter', status: 'pending' },
        { id: 'documents', name: 'Document Collection', status: 'pending' },
        { id: 'background', name: 'Background Verification', status: 'pending' }
    ],
    preboarding: [
        { id: 'email', name: 'Email Setup', status: 'pending' },
        { id: 'badge', name: 'ID Badge Creation', status: 'pending' },
        { id: 'biometric', name: 'Biometric Registration', status: 'pending' },
        { id: 'assets', name: 'IT Assets Assignment', status: 'pending' },
        { id: 'software', name: 'Software Access Setup', status: 'pending' }
    ],
    orientation: [
        { id: 'orientation', name: 'Company Orientation', status: 'pending' },
        { id: 'training', name: 'Role-specific Training', status: 'pending' },
        { id: 'mentor', name: 'Mentor Assignment', status: 'pending' }
    ],
    integration: [
        { id: 'department', name: 'Department Assignment', status: 'pending' },
        { id: 'compliance', name: 'Regulatory Compliance', status: 'pending' },
        { id: 'performance', name: 'Initial Performance Review', status: 'pending' }
    ],
    engagement: [
        { id: 'checkin30', name: '30-day Check-in', status: 'pending' },
        { id: 'checkin60', name: '60-day Check-in', status: 'pending' },
        { id: 'checkin90', name: '90-day Check-in', status: 'pending' },
        { id: 'feedback', name: 'Onboarding Feedback', status: 'pending' }
    ]
};

// Routes
app.get('/api/candidates', (req, res) => {
    res.json(candidates);
});

app.get('/api/candidates/:id', (req, res) => {
    const candidateId = parseInt(req.params.id);
    const candidate = candidates.find(c => c.id === candidateId);
    
    if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
    }
    
    res.json(candidate);
});

app.post('/api/candidates', (req, res) => {
    const { 
        firstName, 
        lastName, 
        role, 
        joiningDate,
        department,
        contactNumber,
        emergencyContact,
        address,
        education,
        experience,
        documents
    } = req.body;
    
    const newCandidate = {
        id: candidates.length + 1,
        firstName,
        lastName,
        role,
        joiningDate,
        department,
        contactNumber,
        emergencyContact,
        address,
        education,
        experience,
        employeeId: null,
        email: null,
        itAssets: [],
        softwareAccess: [],
        documents: documents || [],
        onboardingSteps: ONBOARDING_STEPS,
        currentStage: 'selection',
        onboardingStatus: 'Not Started',
        createdAt: new Date().toISOString(),
        feedback: [],
        checkIns: []
    };
    candidates.push(newCandidate);
    res.status(201).json(newCandidate);
});

app.post('/api/onboard/:id/advance', (req, res) => {
    const candidateId = parseInt(req.params.id);
    const candidate = candidates.find(c => c.id === candidateId);
    
    if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
    }

    const stages = ['selection', 'preboarding', 'orientation', 'integration', 'engagement'];
    const currentIndex = stages.indexOf(candidate.currentStage);
    
    if (currentIndex < stages.length - 1) {
        candidate.currentStage = stages[currentIndex + 1];
        candidate.onboardingStatus = 'In Progress';
        
        // Simulate stage-specific actions
        switch (candidate.currentStage) {
            case 'preboarding':
                candidate.employeeId = generateEmployeeId();
                candidate.email = generateEmail(candidate.firstName, candidate.lastName);
                candidate.itAssets = [
                    IT_ASSETS[Math.floor(Math.random() * 2)],
                    IT_ASSETS[2 + Math.floor(Math.random() * 2)]
                ];
                candidate.softwareAccess = SOFTWARE_ACCESS.slice(0, 2);
                break;
            case 'orientation':
                candidate.mentor = {
                    name: 'John Smith',
                    role: 'Senior Team Lead',
                    department: candidate.department
                };
                break;
            case 'integration':
                candidate.performanceReview = {
                    status: 'Scheduled',
                    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                };
                break;
        }
    }

    res.json(candidate);
});

app.post('/api/onboard/:id/feedback', (req, res) => {
    const candidateId = parseInt(req.params.id);
    const candidate = candidates.find(c => c.id === candidateId);
    
    if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
    }

    const { content, type } = req.body;
    candidate.feedback.push({
        type,
        content,
        date: new Date().toISOString()
    });

    res.json(candidate);
});

app.post('/api/onboard/:id/check-in', (req, res) => {
    const candidateId = parseInt(req.params.id);
    const candidate = candidates.find(c => c.id === candidateId);
    
    if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
    }

    const { notes, day } = req.body;
    candidate.checkIns.push({
        day,
        notes,
        date: new Date().toISOString()
    });

    res.json(candidate);
});

app.get('/api/onboard/:id/status', (req, res) => {
    const candidateId = parseInt(req.params.id);
    const candidate = candidates.find(c => c.id === candidateId);
    
    if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
    }

    const currentStageSteps = candidate.onboardingSteps[candidate.currentStage];
    const completedSteps = currentStageSteps.filter(step => step.status === 'completed').length;
    const totalSteps = currentStageSteps.length;
    const progress = (completedSteps / totalSteps) * 100;

    res.json({
        status: candidate.onboardingStatus,
        currentStage: candidate.currentStage,
        progress: Math.round(progress),
        steps: currentStageSteps
    });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Export the Express app for Vercel
module.exports = app; 