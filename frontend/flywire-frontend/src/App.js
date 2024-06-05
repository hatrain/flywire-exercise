import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { Paper } from '@mui/material';

function App() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', dateHired: '', isActive: true });
  const [deactivateId, setDeactivateId] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchActiveEmployees();
  }, []);

  const fetchActiveEmployees = async () => {
    const response = await axios.get('http://localhost:8080/employees/active');
    setEmployees(response.data);
  };

  const fetchEmployeeById = async () => {
    const response = await axios.get(`http://localhost:8080/employees/${employeeId}`);
    alert(JSON.stringify(response.data));
  };

  const fetchEmployeesHiredWithinRange = async () => {
    const response = await axios.get(`http://localhost:8080/employees/hired?startDate=${startDate}&endDate=${endDate}`);
    setEmployees(response.data);
  };

  const addNewEmployee = async () => {
    const today = new Date().toISOString().split('T')[0];
    const employeeToAdd = {
      ...newEmployee,
      active: true,
      hireDate: today
    };

    try {
      const response = await axios.post('http://localhost:8080/employees/', employeeToAdd);
      alert(`Added: ${JSON.stringify(response.data)}`);
      fetchActiveEmployees();
    } catch (error) {
      console.error('Failed to add new employee:', error);
      alert('Failed to add new employee');
    }
  };

  const deactivateEmployee = async () => {
    const response = await axios.put(`http://localhost:8080/employees/${deactivateId}/deactivate`);
    alert(`Deactivated: ${JSON.stringify(response.data)}`);
    fetchActiveEmployees();
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Employee Management
      </Typography>
      <Paper style={{ padding: '20px', marginBottom: '20px', border: '1px solid #e0e0e0', boxShadow: '0px 3px 5px rgba(0,0,0,0.1)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button variant="contained" startIcon={<RefreshIcon />} onClick={fetchActiveEmployees}>
              Refresh Active Employees
            </Button>
            {employees.map((employee) => (
              <Typography key={employee.id}>{employee.name}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              variant="outlined"
            />
            <Button variant="contained" startIcon={<SearchIcon />} onClick={fetchEmployeeById}>
              Get Employee by ID
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              variant="outlined"
            />
            <TextField
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              variant="outlined"
            />
            <Button variant="contained" onClick={fetchEmployeesHiredWithinRange}>
              Get Employees by Date Range
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Position"
              value={newEmployee.position}
              onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Direct Reports (comma-separated)"
              value={newEmployee.directReports}
              onChange={(e) => setNewEmployee({ ...newEmployee, directReports: e.target.value.split(',') })}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="ID"
              value={newEmployee.id}
              onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
              variant="outlined"
              margin="normal"
            />
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={addNewEmployee} style={{ marginTop: '20px' }}>
              Add New Employee
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Deactivate Employee ID"
              value={deactivateId}
              onChange={(e) => setDeactivateId(e.target.value)}
              variant="outlined"
            />
            <Button variant="contained" startIcon={<BlockIcon />} onClick={deactivateEmployee}>
              Deactivate Employee
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;