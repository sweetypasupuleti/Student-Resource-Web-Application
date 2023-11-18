import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function Enrollform() {
  const [formValues, setFormValues] = useState({
    name: '',
    selectedcourse: '',
    duration: '',
  });
  // eslint-disable-next-line
  const [userData, setUserData] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    phone: '',
    password: '',
    profilePic: '',
  });
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedUser');
    if (isAuthenticated !== 'true') {
      navigate('/login');
    }
  }, []);

  const {id} = useParams();
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    axios
      .get('http://localhost:8081/getcourse/' + id)
      .then(res => {
          // eslint-disable-next-line
        const { coursename, description, duration } = res.data.Result[0];

        setFormValues(prev => ({
          ...prev,
          selectedcourse: coursename,
          duration: duration,
        }));
      })
      .catch(err => console.log(err));

  }, [id]);

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
      axios
        .get(`http://localhost:8081/students/${studentId}`)
        .then((response) => {
          if (response.data.Status === 'Success') {
            setUserData(response.data.data);
            setFormValues(prev => ({
              ...prev,
              name: `${response.data.data.firstname} ${response.data.data.lastname}`,
            }));
          } else {
            console.error('Error fetching user data');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data: ', error);
        });
    }

  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8081/enrollcourse', formValues)
      .then((res) => {
        navigate('/progress/'+formValues.name);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="body">
      <div>
        <br />
      </div>
      <div className="d-flex justify-content-center align-items-center addpage">
        <div className="p-1 rounded w-50 border addform">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <strong>Student Full Name</strong>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formValues.name}
                    autoComplete="off"
                    required
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <strong>Selected Course</strong>
                  <input
                    type="text"
                    className="form-control"
                    id="selectedcourse"
                    name="selectedcourse"
                    value={formValues.selectedcourse}
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <strong>Course Duration</strong>
                  <input
                    type="text"
                    className="form-control"
                    id="duration"
                    name="duration"
                    value={formValues.duration}
                    autoComplete="off"
                    required
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <center>

              <button
                  onClick={handleSubmit}
                  id="enrollCourse"
                  className="btn btn-success"
                  type="button"
                >
                  Confirm Enrollment
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Enrollform;
