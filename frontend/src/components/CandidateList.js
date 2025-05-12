import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  LinearProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  PlayArrow as PlayArrowIcon
} from '@mui/icons-material';
import axios from 'axios';

const CandidateList = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    department: 'all',
    status: 'all',
    dateRange: 'all'
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/candidates');
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboard = async (id) => {
    try {
      await axios.post(`/api/onboard/${id}/advance`);
      fetchCandidates();
    } catch (error) {
      console.error('Error starting onboarding:', error);
    }
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleMenuClick = (event, candidate) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedCandidate(candidate);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedCandidate(null);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/candidates/${selectedCandidate.id}`);
      fetchCandidates();
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
    setDeleteDialogOpen(false);
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filters.department === 'all' || candidate.department === filters.department;
    const matchesStatus = filters.status === 'all' || candidate.onboardingStatus === filters.status;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const stats = {
    total: candidates.length,
    inProgress: candidates.filter(c => c.onboardingStatus === 'In Progress').length,
    completed: candidates.filter(c => c.onboardingStatus === 'Completed').length,
    notStarted: candidates.filter(c => c.onboardingStatus === 'Not Started').length
  };

  return (
    <Container maxWidth="xl">
      <Box mt={4} mb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Total Candidates</Typography>
                <Typography variant="h4">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>In Progress</Typography>
                <Typography variant="h4" color="primary">{stats.inProgress}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Completed</Typography>
                <Typography variant="h4" color="success.main">{stats.completed}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Not Started</Typography>
                <Typography variant="h4" color="text.secondary">{stats.notStarted}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={3}>
          <Typography variant="h4">
            Candidates
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchCandidates}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/candidates/add')}
            >
              Add New Candidate
            </Button>
          </Box>
        </Box>

        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={handleFilterClick}
          >
            Filters
          </Button>
        </Box>

        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              >
                <MenuItem value="all">All Departments</MenuItem>
                <MenuItem value="Flight Operations">Flight Operations</MenuItem>
                <MenuItem value="Cabin Crew">Cabin Crew</MenuItem>
                <MenuItem value="Ground Operations">Ground Operations</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Commercial">Commercial</MenuItem>
              </Select>
            </FormControl>
          </MenuItem>
          <MenuItem>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </MenuItem>
        </Menu>

        {loading ? (
          <LinearProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Joining Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography>
                          {candidate.firstName} {candidate.lastName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{candidate.role}</TableCell>
                    <TableCell>{candidate.department}</TableCell>
                    <TableCell>
                      {new Date(candidate.joiningDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" gap={1} justifyContent="flex-end">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/candidates/${candidate.id}`)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More Actions">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuClick(e, candidate)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => {
            handleMenuClose();
            navigate(`/candidates/${selectedCandidate?.id}/edit`);
          }}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          {selectedCandidate?.onboardingStatus === 'Not Started' && (
            <MenuItem onClick={() => {
              handleMenuClose();
              handleOnboard(selectedCandidate.id);
            }}>
              <ListItemIcon>
                <PlayArrowIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Start Onboarding</ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => {
            handleMenuClose();
            // Implement download functionality
          }}>
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Download Details</ListItemText>
          </MenuItem>
        </Menu>

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Candidate</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this candidate? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default CandidateList; 