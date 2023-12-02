import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Progress.css";

function Progress() {
    const { name } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`https://student-hub-portal.onrender.com/progress/`)
            .then((res) => {
                if (res.data.Status === "Success") {
                    console.log(res.data.Result);
                    setData(res.data.Result);
                } else {
                    alert("Error");
                }
            })
            .catch((err) => console.log(err));
    }, [name]); // Include 'name' as a dependency to re-fetch data when 'name' changes

    const navigate = useNavigate();

    return (
        <>
            <div className="templateContainer2">
                <div className="template_ContainerEnroll1">
                    <center>
                        <h1>Courses Enrolled</h1>
                        <br></br>
                    </center>
                    {data.length > 0 ? (
                        data.map((val) => {
                            if (name === val.name) {
                                return (
                                    <div className="template2" key={val.id} id="enrolledCourse">
                                        <div>
                                            <h4>Course name: {val.selectedcourse}</h4>
                                            <h4>Duration : {val.duration}</h4>
                                            </div>
                                            <button
                                                className="status"
                                            >
                                                Enrolled
                                            </button>
                                    </div>
                                );
                            }
                            return null; // Return null for non-matching entries
                        })
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Progress;
