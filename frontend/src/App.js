import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Button, 
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import CandidateList from './components/CandidateList';
import AddCandidate from './components/AddCandidate';
import CandidateDetail from './components/CandidateDetail';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminPage from './components/AdminPage';

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0057b8', // jazeeraa blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#f5f5f5', // light background
      contrastText: '#0057b8',
    },
    background: {
      default: '#f5f7fa', // subtle light background
      paper: '#fff',
    },
    text: {
      primary: '#222',
      secondary: '#0057b8',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#222',
    },
    h6: {
      fontWeight: 600,
      color: '#222',
    },
    button: {
      fontWeight: 700,
      fontSize: '1rem',
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#0057b8',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: '#0057b8',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#003e8a',
          },
        },
        outlinedPrimary: {
          borderColor: '#0057b8',
          color: '#0057b8',
          '&:hover': {
            backgroundColor: '#e3f0fa',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#0057b8',
          height: 4,
          borderRadius: 2,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          color: '#0057b8',
          '&.Mui-selected': {
            color: '#0057b8',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        },
      },
    },
  },
});

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AppContent() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Candidates', icon: <PeopleIcon />, path: '/candidates' },
    { text: 'Add Candidate', icon: <AddIcon />, path: '/candidates/add' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];
  if (user?.role === 'admin') {
    menuItems.unshift({ text: 'Admin', icon: <SettingsIcon />, path: '/admin' });
  }

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <img 
          src="/Users/sravva/Documents/personal/hrms/frontend/jazeera-logo.png" 
          alt="jazeera Airways" 
          style={{ height: 40, width: 'auto' }}
        />
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img 
              src="/jazeera-logo.png"
              alt="jazeera Airways"
              style={{ height: 40, width: 'auto', marginRight: 16 }}
            />
            <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              HRMS Portal
            </Typography>
          </Box>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" component={Link} to="/candidates">
                Candidates
              </Button>
              <Button color="inherit" component={Link} to="/candidates/add">
                Add Candidate
              </Button>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Spacer for fixed AppBar */}
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </Drawer>

      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Routes>
          <Route path="/" element={<CandidateList />} />
          <Route path="/candidates" element={<CandidateList />} />
          <Route path="/candidates/add" element={<AddCandidate />} />
          <Route path="/candidates/:id" element={<CandidateDetail />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} jazeera Airways. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<RequireAuth><AppContent /></RequireAuth>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
