import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Divider
} from '@mui/material';
import axios from 'axios';

const DEPARTMENTS = [
  'Flight Operations',
  'Cabin Crew',
  'Ground Operations',
  'Engineering',
  'Customer Service',
  'Cargo Operations',
  'Airport Services',
  'Safety & Security',
  'Human Resources',
  'Finance',
  'IT & Digital'
];

const AddCandidate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    joiningDate: '',
    department: '',
    contactNumber: '',
    emergencyContact: '',
    address: '',
    education: '',
    experience: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/candidates', formData);
      navigate('/candidates');
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Paper style={{ padding: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            Add New Candidate
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider style={{ margin: '1rem 0' }} />
                <Typography variant="h6" gutterBottom>
                  Employment Details
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  {DEPARTMENTS.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Joining Date"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider style={{ margin: '1rem 0' }} />
                <Typography variant="h6" gutterBottom>
                  Qualifications
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Add Candidate
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/candidates')}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddCandidate; 