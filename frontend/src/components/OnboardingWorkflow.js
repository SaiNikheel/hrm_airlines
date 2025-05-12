import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material';

const OnboardingWorkflow = ({ candidate, onAdvanceStage, onAddFeedback, onAddCheckIn }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [checkInNotes, setCheckInNotes] = useState('');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      onAddFeedback(feedback, 'general');
      setFeedback('');
    }
  };

  const handleCheckInSubmit = (day) => {
    if (checkInNotes.trim()) {
      onAddCheckIn(checkInNotes, day);
      setCheckInNotes('');
    }
  };

  const renderStageContent = () => {
    switch (currentTab) {
      case 0: // Selection & Offer
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Selection & Offer Stage
              </Typography>
              <Stepper orientation="vertical">
                {candidate.onboardingSteps.selection.map((step) => (
                  <Step key={step.id} active={step.status === 'completed'}>
                    <StepLabel>{step.name}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {candidate.documents.length > 0 && (
                <>
                  <Typography variant="h6" style={{ marginTop: '1rem' }}>
                    Required Documents
                  </Typography>
                  <List>
                    {candidate.documents.map((doc, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={doc.type}
                          secondary={`Uploaded: ${new Date(doc.uploadedAt).toLocaleDateString()}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 1: // Pre-boarding
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pre-boarding Stage
              </Typography>
              <Stepper orientation="vertical">
                {candidate.onboardingSteps.preboarding.map((step) => (
                  <Step key={step.id} active={step.status === 'completed'}>
                    <StepLabel>{step.name}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {candidate.softwareAccess && candidate.softwareAccess.length > 0 && (
                <>
                  <Typography variant="h6" style={{ marginTop: '1rem' }}>
                    Software Access
                  </Typography>
                  <List>
                    {candidate.softwareAccess.map((software, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={software.name}
                          secondary={software.type}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 2: // Orientation & Training
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Orientation & Training Stage
              </Typography>
              <Stepper orientation="vertical">
                {candidate.onboardingSteps.orientation.map((step) => (
                  <Step key={step.id} active={step.status === 'completed'}>
                    <StepLabel>{step.name}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {candidate.mentor && (
                <>
                  <Typography variant="h6" style={{ marginTop: '1rem' }}>
                    Mentor Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={candidate.mentor.name}
                        secondary={`${candidate.mentor.role} - ${candidate.mentor.department}`}
                      />
                    </ListItem>
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 3: // Integration & Compliance
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Integration & Compliance Stage
              </Typography>
              <Stepper orientation="vertical">
                {candidate.onboardingSteps.integration.map((step) => (
                  <Step key={step.id} active={step.status === 'completed'}>
                    <StepLabel>{step.name}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {candidate.performanceReview && (
                <>
                  <Typography variant="h6" style={{ marginTop: '1rem' }}>
                    Performance Review
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`Status: ${candidate.performanceReview.status}`}
                        secondary={`Scheduled for: ${new Date(candidate.performanceReview.date).toLocaleDateString()}`}
                      />
                    </ListItem>
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 4: // Engagement & Feedback
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Engagement & Feedback Stage
              </Typography>
              <Stepper orientation="vertical">
                {candidate.onboardingSteps.engagement.map((step) => (
                  <Step key={step.id} active={step.status === 'completed'}>
                    <StepLabel>{step.name}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              
              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Check-ins
                </Typography>
                {[30, 60, 90].map((day) => (
                  <Box key={day} mb={2}>
                    <Typography variant="subtitle1">
                      {day}-day Check-in
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      value={checkInNotes}
                      onChange={(e) => setCheckInNotes(e.target.value)}
                      placeholder="Enter check-in notes..."
                      style={{ marginBottom: '0.5rem' }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCheckInSubmit(day)}
                    >
                      Submit {day}-day Check-in
                    </Button>
                  </Box>
                ))}
              </Box>

              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Feedback
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your feedback..."
                  style={{ marginBottom: '1rem' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFeedbackSubmit}
                >
                  Submit Feedback
                </Button>
              </Box>

              {candidate.feedback && candidate.feedback.length > 0 && (
                <Box mt={3}>
                  <Typography variant="h6" gutterBottom>
                    Previous Feedback
                  </Typography>
                  <List>
                    {candidate.feedback.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={item.content}
                          secondary={`${item.type} - ${new Date(item.date).toLocaleDateString()}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Paper style={{ padding: '1rem' }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Selection & Offer" />
        <Tab label="Pre-boarding" />
        <Tab label="Orientation & Training" />
        <Tab label="Integration & Compliance" />
        <Tab label="Engagement & Feedback" />
      </Tabs>

      <Box mt={2}>
        {renderStageContent()}
      </Box>

      {currentTab < 4 && (
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onAdvanceStage()}
          >
            Advance to Next Stage
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default OnboardingWorkflow; 