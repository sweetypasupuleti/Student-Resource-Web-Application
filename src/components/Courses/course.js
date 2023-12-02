import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./course.css";
//eslint-disable-next-line
import settings, { carousel } from "../common-components/slick";
import Slider from "react-slick";
function Course() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchCourseData = () => {
    axios
      .get("https://student-hub-portal.onrender.com/getcourses")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setOriginalData(res.data.Result);
          setFilteredData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    fetchCourseData();
  }, []);
  
  const handleSearch = (event) => {
    event.preventDefault();
    const filteredResults = originalData.filter((item) =>
      item.coursename.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
  };
  const isAuthenticated = localStorage.getItem('authenticatedUser');
  return (
    <>
      <div className="body">
        <div>
          <br />
        </div>

        <div></div>
      </div>
      <div className="templateContainer">
        <div className="searchInput_Container">
          <input
            id="searchInput"
            type="text"
            placeholder="Type here to search course"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
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
                    <img src={val.imgurl} alt="" />
                  <div className="course-details">
                    <h3 className="course-name">{val.coursename}</h3>
                    <p className="course-description">{val.description}</p>
                    <p className="course-duration">Duration:{val.duration}</p>
                    {isAuthenticated && <Link to={`/enrollcourse/`+val.id} id="enrollCourse" className="btn btn-success"  style={{ textDecoration: 'none' }} type="button">Enroll</Link>}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No courses found.</p>
          )}
        </Slider>
      </div>
    </>
  );
}

export default Course;
