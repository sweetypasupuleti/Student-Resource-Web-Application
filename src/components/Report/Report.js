import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Report.css";
const Report = () => {
  const [user, setUser] = useState(null);
  const [gameStats, setGameStats] = useState([]);
  
  useEffect(() => {
    // Fetch user details from the login table
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
      axios.get(`https://student-hub-portal.onrender.com/gameusers/${studentId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }

    // Fetch game statistics from the quizscore table
    axios.get(`https://student-hub-portal.onrender.com/game?studentId=${studentId}`)
      .then((response) => {
        setGameStats(response.data);
      })
      .catch((error) => {
        console.error('Error fetching game statistics:', error);
      });
  }, []);

  return (
    <div className="dashboard">
      {user && (
        <div className="user-info">
          <center>
          <br></br>
          <h2>Welcome, {user.firstname}, See Your Quiz Performance Here !!!</h2>
          </center>
        </div>
      )}
      <center>
      <div className="game-stats">
        <h3>Quiz Statistics:</h3>
        <table>
          <thead>
            <tr>
              <th>Title </th>
              <th>No. Correct Answers</th>
              <th>No. Wrong Answers</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {gameStats.map((game, index) => (
              <tr key={index}>
                <td>{game.title}</td>
                <td>{game.correctans}</td>
                <td>{game.wrongans}</td>
                <td>{game.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </center>
    </div>
  );
};

export default Report;