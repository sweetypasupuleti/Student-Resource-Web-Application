import React, { useEffect, useState } from "react";
import axios from "axios";

function Araiseproblem() {
  const [originalData, setOriginalData] = useState([]);
  const [data, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const API_BASE_URL = "https://student-hub-portal.onrender.com";

  const handleStatusChange = (id, currentStatus) => {
    let newStatus;
    let buttonText;
    let buttonColor;

    if (currentStatus === "verified") {
      newStatus = "unverified";
      buttonText = "UnVerified";
      buttonColor = "grey";
    }  else {
      newStatus = "verified";
      buttonText = "Verified";
      buttonColor = "Blue";
    }

    // Update the status in the client-side state directly
    const selectedItem = data.find((val) => val.id === id);
    if (!selectedItem) {
      // Handle the case when the item is not found
      console.log("Item not found");
      return;
    }

    // Create a new object with the updated status and the rest of the properties from the selected item
    const updatedItem = {
      ...selectedItem,
      stat: newStatus,
    };
    setFilteredData((prevData) =>
      prevData.map((val) => (val.id === id ? updatedItem : val))
    );

    // Call backend to update status
    axios
      .put("http://localhost:8081/updateproblem", {
        id: id,
        stat: newStatus,
      })
      .then((response) => {
        if (response.data.success) {
          // Update the state to reflect the change in the frontend
          const updatedData = data.map((app) => {
            if (app.id === id) {
              return { ...app, stat: newStatus };
            }
            return app;
          });
          setFilteredData(updatedData);
        } else {
          alert("Error updating status");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating status");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/getproblem")
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
      item.problem.toString().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const handleDeleteRow = (id) => {
    // Call the server to delete the row
    axios
    .delete(`https://student-hub-portal.onrender.com/deleteproblem/${id}`)
    .then(res => {
      if (res.data.Status === 'Success') {
        window.location.reload(true);
      } else {
        alert('Error');
      }
    })
    .catch(err => console.log(err));
};
  return (
    <>
      <div className="body">
        <div>
          <br />
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="template_Container">
        <div className="row justify-content-center mb-3">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="input-group">
              <input
                id="searchStudent"
                type="text"
                className="form-control"
                placeholder="Seach your queries here"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
              />
              <button className="btn btn-success" type="submit" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        <br></br>
        {data.length > 0 ? (
          <center>
            <table className="gridTable">
              <thead>
                <tr>
                  <th>SNo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Problem</th>
                  <th>Solution</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((val) => {
                  const currentStatus = val.stat;
                  let buttonText, buttonColor;

                  if (currentStatus === "unverified") {
                    buttonText = "Approve";
                    buttonColor = "lightgrey";
                  } else {
                    buttonText = "Verified";
                    buttonColor = "lightgreen";
                  }

                  return (
                    <tr key={val.id}>
                      <td>{val.id}</td>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.problem}</td>
                      <td>{val.solution}</td>
                      <td>
                        <button
                          style={{ backgroundColor: buttonColor }}
                          onClick={() => handleStatusChange(val.id, val.stat)}
                        >
                          {buttonText}
                        </button>
                      </td>
                      <td>
                        <button className="delete" onClick={() => handleDeleteRow(val.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </center>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <br></br>
    </>
  );
}

export default Araiseproblem;
