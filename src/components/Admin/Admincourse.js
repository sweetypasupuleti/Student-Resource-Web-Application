import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate import
import axios from "axios";
import "./Admincourse.css";
import settings, { carousel } from "../common-components/slick";
import Slider from "react-slick";
import { FaEdit, FaTrash } from 'react-icons/fa';

function Admincourse() {
  const navigate = useNavigate();  // Hook to navigate to another route
  
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/getcourses")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setOriginalData(res.data.Result);
          setFilteredData(res.data.Result); // Initialize filteredData with original data
        } else {
          alert("Error"); 
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredResults = originalData.filter((item) =>
      item.coursename.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const handleDelete = id => {
    axios
      .delete(`http://localhost:8081/deletecourse/${id}`)
      .then(res => {
        if (res.data.Status === 'Success') {
          // Reload the page or update the state as needed
          window.location.reload(true);
        } else {
          alert('Error: Unable to delete course');
        }
      })
      .catch(err => {
        console.error('Error while deleting course:', err);
        alert('Error: Unable to delete course');
      });
  };

  return (
    <>
      <div className="body">
        <div><br /></div>
        <div></div>
      </div>
      
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input
            id="searchInput"
            type="text"
            placeholder="Type here to search course"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button
            className="btn btn-success w-10"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <h2 id="courses-avai">Courses Available</h2>
        <Slider {...settings}>
          {filteredData.length > 0 ? (
            filteredData.map((val) => {
              return (
                <div className="course-image-wrapper" key={val.id}>
                  <Link to={"/enrollcourse"}>
                    <img src={val.imgurl} alt="" />
                  </Link>
                  <div className="course-details">
                    <h3 className="course-name">{val.coursename}</h3>
                    <p className="course-description">{val.description}</p>
                    <p className="course-duration">Duration:{val.duration}</p>
                    <div className="icon-wrapper">
                      <Link to={`/editcourse/` + val.id}>
                        <FaEdit />
                      </Link>
                      <Link onClick={e => handleDelete(val.id)} id="deleteCourse" className="deleteButton">
                        <FaTrash />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No courses found.</p>
          )}
        </Slider>
        <br></br>
        <button className="add-course-button" onClick={() => navigate('/addcourse')}>Add Course</button> {/* "Add Course" button */}
      </div>
    </>
  );
}

export default Admincourse;