import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', dateHired: '', isActive: true });
  const [deactivateId, setDeactivateId] = useState('');

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

  return (
    <div>
      <h1>Employee Management</h1>
      <div>
        <button onClick={fetchActiveEmployees}>Refresh Active Employees</button>
        {employees.map((employee) => (
          <div key={employee.id}>{employee.name}</div>
        ))}
      </div>
      <div>
        <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Employee ID" />
        <button onClick={fetchEmployeeById}>Get Employee by ID</button>
      </div>
      <div>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={fetchEmployeesHiredWithinRange}>Get Employees by Date Range</button>
      </div>
      <div>
        <input value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} placeholder="Name" />
        <input value={newEmployee.position} onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })} placeholder="Position" />
        <input value={newEmployee.directReports} onChange={(e) => setNewEmployee({ ...newEmployee, directReports: e.target.value.split(',') })} placeholder="Direct Reports (comma-separated)" />
        <input value={newEmployee.id} onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })} placeholder="ID" />
        <button onClick={addNewEmployee}>Add New Employee</button>
      </div>
      <div>
        <input value={deactivateId} onChange={(e) => setDeactivateId(e.target.value)} placeholder="Deactivate Employee ID" />
        <button onClick={deactivateEmployee}>Deactivate Employee</button>
      </div>
    </div>
  );
}

export default App;