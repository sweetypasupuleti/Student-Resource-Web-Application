import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Admin/EditCourse.css"; 

function Addresource() {
  const [formValues, setFormValues] = useState({
    title: '',
    sourceurl: '',
    imageurl: '',
    author: ''
  });
  const navigate = useNavigate();
  useEffect(() => {
		const isAuthenticated = localStorage.getItem('authenticatedAdmin');
		if (isAuthenticated !== 'true') {
		  navigate('/login');
		}
	  });

  const handleInput = event => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`http://localhost:8081/addresource`, formValues)
      .then(res => {
        if (res.data.status === 'Success') {
          navigate('/resources');
        } else {
          alert('Error: Unable to add resource');
        }
      })
      .catch(err => {
        console.error('Error while adding resource:', err);
        alert('Error: Unable to add resource');
      });
  };

  return (
    <>
      <div className="body">
        <div><br /></div>
        <div></div>
      </div>
      <center>
        <h2>Add Resources</h2>
      </center>
      <div className="d-flex justify-content-center align-items-center vh-100 addpage">
        <div className="p-1 rounded w-25 border addform">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input 
                type="text"
                className="form-control"
                name="title"
                placeholder="Enter title"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="sourceurl"
                placeholder="Enter the source url"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="imageurl"
                placeholder="Enter the image url"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <input
              type="text"
                className="form-control"
                name="author"
                placeholder="Enter the source name"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-success">
                Add Resource
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addresource;
