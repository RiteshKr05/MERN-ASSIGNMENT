import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [error, setError] = useState('');
  const isManager = localStorage.getItem('isManager') === 'true';

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEmployee(response.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `/api/employees/${id}`,
        { name: employee.name, email: employee.email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Show success message or redirect
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Redirect to employee list or show success message
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Employee Details</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Name"
          value={employee.name || ''}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={employee.email || ''}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        />
        <button type="submit">Update</button>
      </form>
      {isManager && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
};

export default EmployeeDetails;