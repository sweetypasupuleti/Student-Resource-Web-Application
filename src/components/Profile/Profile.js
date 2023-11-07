import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
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
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
      axios
        .get(`http://localhost:8081/students/${studentId}`)
        .then((response) => {
          if (response.data.Status === 'Success') {
            setUserData(response.data.data);
          } else {
            console.error('Error fetching user data');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data: ', error);
        });
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePicUpload = (event) => {
    // Handle profile picture upload logic here and update the URL in userData.profilePic
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePic', file);

      axios
        .post(`http://localhost:8081/uploadProfilePic`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data.Status === 'Success') {
            setUserData((prevData) => ({
              ...prevData,
              profilePic: response.data.profilePicURL,
            }));
          } else {
            console.error('Error uploading profile picture');
          }
        })
        .catch((error) => {
          console.error('Error uploading profile picture: ', error);
        });
    }
  };

  const handleSubmit = () => {
    const studentId = localStorage.getItem('studentId');
    if (studentId) {
      axios
        .put(`http://localhost:8081/students/${studentId}`, userData)
        .then((response) => {
          if (response.data.Status === 'Success') {
            // Data updated successfully
            // You can also show a success message to the user
          } else {
            console.error('Error updating user data');
          }
        })
        .catch((error) => {
          console.error('Error updating user data: ', error);
        });
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <form>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={userData.dob}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicUpload}
          />
        </div>
        <button onClick={handleSubmit}>Update Profile</button>
      </form>

    </div>
  );
}

export default Profile;