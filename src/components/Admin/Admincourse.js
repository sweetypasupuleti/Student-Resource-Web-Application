import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./EditCourse.css"; 

function Addcourse() {
  const [formValues, setFormValues] = useState({
    coursename: '',
    imgurl: '',
    description: '',
    duration: ''
  });

  const navigate = useNavigate();

  const handleInput = event => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`http://localhost:8081/addcourse`, formValues)
      .then(res => {
        if (res.data.status === 'Success') {
          navigate('/admincourses');
        } else {
          alert('Error: Unable to add course');
        }
      })
      .catch(err => {
        console.error('Error while adding course:', err);
        alert('Error: Unable to add course');
      });
  };

  return (
    <>
      <div className="body">
        <div><br /></div>
        <div></div>
      </div>
      <center>
        <h2>Add Course</h2>
      </center>
      <div className="d-flex justify-content-center align-items-center vh-100 addpage">
        <div className="p-1 rounded w-25 border addform">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input 
                type="text"
                value={formValues.coursename}
                className="form-control"
                name="coursename"
                placeholder="Enter Course Name"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={formValues.imgurl}
                className="form-control"
                name="imgurl"
                placeholder="Enter the image url"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
              type="text"
                value={formValues.description}
                className="form-control"
                name="description"
                placeholder="Enter the course description"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={formValues.duration}
                className="form-control"
                name="duration"
                placeholder="Enter the course duration"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-success">
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addcourse;