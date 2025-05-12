import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import OnboardingWorkflow from './OnboardingWorkflow';

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [error, setError] = useState(null);

  const fetchCandidateDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/candidates/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch candidate details');
      }
      const data = await response.json();
      setCandidate(data);
    } catch (err) {
      setError(err.message);
    }
  }, [id]);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/onboard/${id}/status`);
      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }
      await response.json();
    } catch (err) {
      setError(err.message);
    }
  }, [id]);

  useEffect(() => {
    fetchCandidateDetails();
    fetchStatus();
  }, [fetchCandidateDetails, fetchStatus]);

  const handleAdvanceStage = async () => {
    try {
      const response = await fetch(`/api/onboard/${id}/advance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to advance stage');
      }
      await fetchStatus();
      await fetchCandidateDetails();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddFeedback = async (content, type) => {
    try {
      const response = await fetch(`/api/onboard/${id}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, type })
      });
      if (!response.ok) {
        throw new Error('Failed to add feedback');
      }
      await fetchCandidateDetails();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddCheckIn = async (notes, day) => {
    try {
      const response = await fetch(`/api/onboard/${id}/check-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes, day })
      });
      if (!response.ok) {
        throw new Error('Failed to add check-in');
      }
      await fetchCandidateDetails();
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return (
      <Container>
        <Alert severity="error" style={{ marginTop: '2rem' }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!candidate) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={{ padding: '2rem' }}>
              <Typography variant="h4" gutterBottom>
                {candidate.firstName} {candidate.lastName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                {candidate.role} - {candidate.department}
              </Typography>
              <Box display="flex" gap={1} mb={2}>
                <Chip
                  label={candidate.onboardingStatus}
                  color={
                    candidate.onboardingStatus === 'Completed'
                      ? 'success'
                      : candidate.onboardingStatus === 'In Progress'
                      ? 'primary'
                      : 'default'
                  }
                />
                {candidate.employeeId && (
                  <Chip label={`Employee ID: ${candidate.employeeId}`} />
                )}
              </Box>
              <Typography variant="body1" gutterBottom>
                Email: {candidate.email || 'Not assigned'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Joining Date: {new Date(candidate.joiningDate).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Contact Number"
                      secondary={candidate.contactNumber}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Emergency Contact"
                      secondary={candidate.emergencyContact}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Address"
                      secondary={candidate.address}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Qualifications
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Education"
                      secondary={candidate.education}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Experience"
                      secondary={candidate.experience}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {candidate.itAssets && candidate.itAssets.length > 0 && (
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    IT Assets
                  </Typography>
                  <List>
                    {candidate.itAssets.map((asset, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={asset.type}
                          secondary={asset.model}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          )}

          {candidate.softwareAccess && candidate.softwareAccess.length > 0 && (
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
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
                </CardContent>
              </Card>
            </Grid>
          )}

          <Grid item xs={12}>
            <OnboardingWorkflow
              candidate={candidate}
              onAdvanceStage={handleAdvanceStage}
              onAddFeedback={handleAddFeedback}
              onAddCheckIn={handleAddCheckIn}
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={() => navigate('/candidates')}
              >
                Back to List
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CandidateDetail; 