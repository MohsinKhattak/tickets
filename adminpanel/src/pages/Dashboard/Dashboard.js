import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [senders, setSenders] = useState([]);

  useEffect(() => {
    // Fetch sender data from the backend
    axios
      .get("http://localhost:3000/api/admin/senders")
      .then((response) => {
        console.log("API Response:", response.data);
        setSenders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sender data:", error);
      });
  }, []);

  const handleDeleteSender = async (senderId) => {
    // Ask the user for confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sender?"
    );

    if (!confirmDelete) {
      return; // Cancel the deletion if the user clicks "Cancel"
    }

    try {
      // Make an API request to delete the sender by ID
      await axios.delete(
        `http://localhost:3000/api/admin/delete-sender/${senderId}`
      );

      // Remove the deleted sender from the state
      setSenders((prevSenders) =>
        prevSenders.filter((sender) => sender.id !== senderId)
      );
    } catch (error) {
      console.error("Error deleting sender:", error);
    }
  };

  return (
    <div className="page">
      <div className="col-sm-12 d-flex pt-5 flex-column align-items-center justify-content-start">
        <h1 className="align-self-center text-black mb-3">Sender Management</h1>
        <div className="col-11">
          {senders.length === 0 ? (
            <p>No sender users found.</p>
          ) : (
            <table className="table table-bordered table-striped shadow-lg">
              <thead>
                <tr>
                  <th scope="col">U-id</th>
                  <th scope="col">Profile Picture</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th className="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {senders.map((sender) => (
                  <tr key={sender.id}>
                    <th scope="row">{sender.id}</th>
                    <td>{sender.profile_picture}</td>
                    <td>{sender.username}</td>
                    <td>{sender.email}</td>
                    <td>{sender.address}</td>
                    <td>{sender.phone}</td>
                    <td className="d-flex flex-row justify-content-around">
                      <p>
                        <button
                          onClick={() => handleDeleteSender(sender.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
