import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../Courses/course.css";
//eslint-disable-next-line
import settings, { carousel } from "../common-components/slick";
import Slider from "react-slick";
function Academic() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticatedAdmin');
    if (isAuthenticated === 'true') {
      setIsAdmin(true);
    }
  }, []);
  const navigate = useNavigate();
  const fetchCourseData = () => {
    axios
      .get("https://student-hub-portal.onrender.com/getresources")
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
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
  };
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
            placeholder="Type here to find resource"
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
        <h2 id="courses-avai">Available Resources</h2><br></br>
        <Slider {...settings}>
          {filteredData.length > 0 ? (
            filteredData.map((val) => {
              return (
                <div className="course-image-wrapper" key={val.id}>
                    <img src={val.imageurl} alt="" />
                  <div className="course-details">
                    <h3 className="course-name">{val.title}</h3>
                    <a href={val.sourceurl} target="_blank" rel="noopener noreferrer">
                    Click here to access
                    </a>           
                 <p className="course-duration">Source : {val.author}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No resources found.</p>
          )}
        </Slider>
        {isAdmin && <button className="add-course-button" onClick={() => navigate('/addresource')}>Add Resource</button>} {/* "Add Course" button */}
      </div>
    </>
  );
}

export default Academic;
