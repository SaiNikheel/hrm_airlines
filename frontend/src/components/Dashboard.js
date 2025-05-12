import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const COLORS = ['#0057b8', '#f57c00', '#43a047', '#e53935'];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, inProgress: 0, completed: 0, notStarted: 0 });
  const [recent, setRecent] = useState([]);
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecent();
    fetchTrend();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/candidates');
      const candidates = res.data;
      setStats({
        total: candidates.length,
        inProgress: candidates.filter(c => c.onboardingStatus === 'In Progress').length,
        completed: candidates.filter(c => c.onboardingStatus === 'Completed').length,
        notStarted: candidates.filter(c => c.onboardingStatus === 'Not Started').length
      });
    } catch {}
  };

  const fetchRecent = async () => {
    try {
      const res = await axios.get('/api/candidates');
      setRecent(res.data.slice(-5).reverse());
    } catch {}
  };

  const fetchTrend = async () => {
    // Mock trend data for now
    setTrend([
      { month: 'Jan', onboarded: 2 },
      { month: 'Feb', onboarded: 4 },
      { month: 'Mar', onboarded: 3 },
      { month: 'Apr', onboarded: 6 },
      { month: 'May', onboarded: 5 },
    ]);
  };

  const pieData = [
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Completed', value: stats.completed },
    { name: 'Not Started', value: stats.notStarted },
  ];

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Welcome{user?.role === 'admin' ? ', Admin' : ''}!
      </Typography>
      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Total Candidates</Typography>
              <Typography variant="h5">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">In Progress</Typography>
              <Typography variant="h5" color="primary">{stats.inProgress}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Completed</Typography>
              <Typography variant="h5" color="success.main">{stats.completed}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Not Started</Typography>
              <Typography variant="h5" color="text.secondary">{stats.notStarted}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button variant="contained" color="primary" onClick={() => navigate('/candidates/add')}>Add Candidate</Button>
                <Button variant="outlined" onClick={() => navigate('/candidates')}>View All Candidates</Button>
                <Button variant="outlined" disabled>Export Data</Button>
                <Button variant="outlined" disabled>View Reports</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Status Breakdown</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Candidates</Typography>
              <List>
                {recent.map((c) => (
                  <ListItem key={c.id} button onClick={() => navigate(`/candidates/${c.id}`)}>
                    <Avatar sx={{ bgcolor: '#0057b8', mr: 2 }}>{c.firstName[0]}</Avatar>
                    <ListItemText
                      primary={`${c.firstName} ${c.lastName}`}
                      secondary={`Status: ${c.onboardingStatus}`}
                    />
                    <Chip label={c.onboardingStatus} color={c.onboardingStatus === 'Completed' ? 'success' : c.onboardingStatus === 'In Progress' ? 'primary' : 'default'} size="small" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        {/* Trend Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Onboarding Trend</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={trend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Bar dataKey="onboarded" fill="#0057b8" />
                  <RechartsTooltip />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 