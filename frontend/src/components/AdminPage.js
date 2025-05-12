import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const AdminPage = () => {
  const { user } = useAuth();
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Welcome, {user?.role === 'admin' ? 'Admin' : 'User'}!</Typography>
              <Typography color="text.secondary">
                This is the admin page. Here you can manage users, view system settings, and access admin-only features.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more admin widgets or features here */}
      </Grid>
    </Box>
  );
};

export default AdminPage; 