import React, { useState, useEffect } from "react";
import axios from "axios";

const Receiver = () => {
  const [receivers, setReceivers] = useState([]);
  const [approvedReceivers, setApprovedReceivers] = useState([]);
  const [unapprovedReceivers, setUnapprovedReceivers] = useState([]);
  const [selectedApprovals, setSelectedApprovals] = useState({});
  const [isEditing, setIsEditing] = useState({}); // State object to track editing state

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get("http://localhost:3000/api/admin/receivers")
      .then((response) => {
        console.log("API Response:", response.data);
        setReceivers(response.data);
        const approved = response.data.filter(
          (receiver) => receiver.isApproved
        );
        const unapproved = response.data.filter(
          (receiver) => !receiver.isApproved
        );
        setApprovedReceivers(approved);
        setUnapprovedReceivers(unapproved);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleApprovalChange = (receiverId, newApprovalStatus) => {
    axios
      .put(`http://localhost:3000/api/admin/approve-receiver/${receiverId}`, {
        isApproved: newApprovalStatus === "1", // Convert to boolean (0 or 1)
      })
      .then((response) => {
        console.log("Approval status updated:", response.data);
        // You may want to update the local state here to reflect the change
      })
      .catch((error) => {
        console.error("Error updating approval status:", error);
      });
  };

  const toggleEditing = (receiverId) => {
    setIsEditing({
      ...isEditing,
      [receiverId]: !isEditing[receiverId],
    });
  };

  const handleDeleteReceiver = async (receiverId) => {
    // Ask the user for confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this receiver?"
    );

    if (!confirmDelete) {
      return; // Cancel the deletion if the user clicks "Cancel"
    }

    try {
      // Make an API request to delete the receiver by ID
      await axios.delete(
        `http://localhost:3000/api/admin/delete-receiver/${receiverId}`
      );

      // Remove the deleted receiver from the state
      setReceivers((prevReceivers) =>
        prevReceivers.filter((receiver) => receiver.id !== receiverId)
      );
    } catch (error) {
      console.error("Error deleting receiver:", error);
    }
  };

  const handleSaveClick = (receiverId) => {
    const newApprovalStatus = selectedApprovals[receiverId];
    handleApprovalChange(receiverId, newApprovalStatus);
    toggleEditing(receiverId); // Exit edit mode
  };

  const renderTable = (data, showEditButton) => {
    if (data.length === 0) {
      return <p>No users found.</p>;
    } else {
      return (
        <table className="table table-bordered table-striped shadow-lg">
          <thead>
            <tr>
              <th scope="col">U-id</th>
              <th scope="col">Profile Picture</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Approved</th>
              <th className="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((receiver) => (
              <tr key={receiver.id}>
                <th scope="row">{receiver.id}</th>
                <td>{receiver.profile_picture}</td>
                <td>{receiver.username}</td>
                <td>{receiver.email}</td>
                <td>
                  {isEditing[receiver.id] ? (
                    <select
                      value={selectedApprovals[receiver.id] || ""}
                      onChange={(e) => {
                        const newApprovalStatus = e.target.value;
                        setSelectedApprovals({
                          ...selectedApprovals,
                          [receiver.id]: newApprovalStatus,
                        });
                      }}
                    >
                      <option value="1">Approved</option>
                      <option value="0">Unapproved</option>
                    </select>
                  ) : receiver.isApproved ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </td>
                <td className="d-flex flex-row justify-content-around">
                  {showEditButton && !isEditing[receiver.id] ? (
                    <button
                      onClick={() => toggleEditing(receiver.id)}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  ) : null}
                  {isEditing[receiver.id] ? (
                    <>
                      <button
                        onClick={() => handleSaveClick(receiver.id)}
                        className="btn btn-primary"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEditing(receiver.id)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </>
                  ) : null}
                  <button
                    onClick={() => handleDeleteReceiver(receiver.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="page">
      <div className="col-sm-12 d-flex pt-5 flex-column align-items-center justify-content-start">
        <h1 className="align-self-center text-black mb-3">
          unApproved Receivers
        </h1>
        <div className="col-11">{renderTable(unapprovedReceivers, true)}</div>
      </div>
      <div className="col-sm-12 d-flex pt-5 flex-column align-items-center justify-content-start">
        <h1 className="align-self-center text-black mb-3">
          Approved Receivers
        </h1>
        <div className="col-11">{renderTable(approvedReceivers, false)}</div>
      </div>
    </div>
  );
};

export default Receiver;
