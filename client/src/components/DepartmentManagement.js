import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/api/departments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDepartments(response.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        '/api/departments',
        { name, description, managerEmail },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Reset form and fetch departments again
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Department Management</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="email"
          placeholder="Manager Email"
          value={managerEmail}
          onChange={(e) => setManagerEmail(e.target.value)}
        />
        <button type="submit">Create Department</button>
      </form>
      <h3>Departments</h3>
      <ul>
        {departments.map((department) => (
          <li key={department._id}>
            {department.name} - {department.description} - {department.manager.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentManagement;