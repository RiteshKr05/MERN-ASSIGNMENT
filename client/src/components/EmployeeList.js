import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [nameOrder, setNameOrder] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleLocationFilterChange = async (e) => {
    setLocationFilter(e.target.value);

    try {
      const response = await axios.get(`/api/employees/filter/location?location=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEmployees(response.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleNameOrderChange = async (e) => {
    setNameOrder(e.target.value);

    try {
      const response = await axios.get(`/api/employees/filter/name?order=${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEmployees(response.data);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      {error && <p>{error}</p>}
      <div>
        <label>
          Filter by Location:
          <input type="text" value={locationFilter} onChange={handleLocationFilterChange} />
        </label>
        <label>
          Sort by Name:
          <select value={nameOrder} onChange={handleNameOrderChange}>
            <option value="">Select an option</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <Link to={`/employees/${employee._id}`}>{employee.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;