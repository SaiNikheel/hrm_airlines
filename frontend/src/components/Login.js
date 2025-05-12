import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('admin');
  const [candidateId, setCandidateId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'candidate' && !candidateId.trim()) {
      setError('Please enter your Candidate ID.');
      return;
    }
    login(role, role === 'candidate' ? candidateId.trim() : null);
    navigate('/candidates');
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          minWidth: '100vw',
          minHeight: '100vh',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay for login form */}
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box width="100%">
          <Paper elevation={6} sx={{ p: 4, background: 'rgba(255,255,255,0.85)', borderRadius: 4 }}>
            <Box display="flex" justifyContent="center" mb={2}>
              <img src="/jazeera-logo.png" alt="jazeera Airways" style={{ height: 56, width: 'auto' }} />
            </Box>
            <Typography variant="h5" gutterBottom align="center">
              jazeera Airways HRMS Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                <FormLabel component="legend">Login as</FormLabel>
                <RadioGroup
                  row
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                  <FormControlLabel value="candidate" control={<Radio />} label="Candidate" />
                </RadioGroup>
              </FormControl>
              {role === 'candidate' && (
                <TextField
                  label="Candidate ID"
                  value={candidateId}
                  onChange={(e) => setCandidateId(e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                />
              )}
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login; 