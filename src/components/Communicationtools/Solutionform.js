import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './communication.css';
function SolutionForm() {
  const { id } = useParams();
  const [solution, setSolution] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedUser');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, []);
  const updateSolution = () => {
    axios.put(`https://student-hub-portal.onrender.com/updatesolution/${id}`, { solution })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const handleUpdateSolution = () => {
    updateSolution();
    navigate(`/tools`);
  };
  

  return (
    <div className='p-1 rounded w-25 border addform'>
      <h1>Solution Form</h1><br></br>
      <h4>Please Submit your solution here</h4><br></br>
      <textarea
    value={solution}
    className="form-control"
    style={{ padding: '5px 200px 100px 10px' }}  // Adjusted padding
    onChange={(e) => setSolution(e.target.value)}
/><br></br>

      <button className="btn btn-success" onClick={handleUpdateSolution}>Update Solution</button>

    </div>
  );
}

export default SolutionForm;
