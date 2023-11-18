import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./EditCourse.css";
function EditCourse() {
  const [formValues, setFormValues] = useState({
    id: '',
    coursename: '',
    imgurl: '',
    description: '',
    duration: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
		const isAuthenticated = localStorage.getItem('authenticatedAdmin');
		if (isAuthenticated !== 'true') {
		  navigate('/login');
		}
	  });

  useEffect(() => {
    axios.get(`http://localhost:8081/getcourses/` + id)
      .then(res => {
        const {
            id,	
            coursename,	
            imgurl,	
            description,	
            duration
        } = res.data.Result[0];

        setFormValues({
            id,	
            coursename,	
            imgurl,	
            description,	
            duration
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleInput = event => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/updatecourse/` + id, formValues)
      .then(res => {
        if (res.data.Status === 'Success') {
          // Redirect to the appropriate page or update the state as needed
          navigate('/admincourses');
        }
      })
      .catch(err => {
        console.error('Error while updating course:', err);
        alert('Error: Unable to update course');
      });
  };
  

  

  return (
    <>
       <div className="body">
        <div>
          <br />
        </div>

        <div></div>
      </div>
      <center>
        <h2>Edit Course</h2>
        </center>
      <div className="d-flex justify-content-center align-items-center vh-100 addpage">
        <div className="p-1 rounded w-25 border addform">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <p>Enter Course Name :</p><br></br>
              <input 
                type="text"
                value={formValues.coursename}
                className="form-control"
                id="editcoursename"
                name="coursename"
                placeholder="Enter Course Name"
                autoComplete="on"
                onChange={handleInput}
              />
            </div>
          
            <div className="mb-3">
            <p>Image Url: </p><br></br>
              <input
                type="text"
                value={formValues.imgurl}
                className="form-control"
                id="editimgurl"
                name="imgurl"
                placeholder="Enter the image url"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>

	     <div className="mb-3">
       <p>Enter Description: </p><br></br>
              <input
                type="text"
                value={formValues.description}
                className="form-control"
                id="editdescription"
                name="description"
                placeholder="Enter the description"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
            <p>Enter Description: </p><br></br>
              <input
                type="text"
                value={formValues.duration}
                className="form-control"
                id="editduration"
                name="duration"
                placeholder="Enter the duration"
                autoComplete="off"
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <button
                type="submit"
                id="updateButton"
                className="btn btn-success w-10">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditCourse;