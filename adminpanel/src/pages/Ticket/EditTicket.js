import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditTicket = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [receiverOptions, setReceiverOptions] = useState([]);
  const [saved, setSaved] = useState(false);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    fetchTicket(ticketId);
    fetchReceiverOptions();
  }, [ticketId]);

  const fetchTicket = async (ticketId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/ticket/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
          },
        }
      );
      setTicket(response.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };

  const fetchReceiverOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/receivers",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
          },
        }
      );
      setReceiverOptions(response.data);
    } catch (error) {
      console.error("Error fetching receiver options:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/ticket/update/${ticket.id}`,
        {
          receiver_id: ticket.receiver_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
          },
        }
      );
      setSaved(true);
    } catch (error) {
      console.error("Error saving ticket:", error);
    }
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Assign Ticket</h1>
      <div className="form-group d-flex flex-row align-items-center justify-content-center">
        <label className=" fs-4">Subject:</label>
        <div className="content fw-medium fs-4">{ticket.subject}</div>
      </div>
      <div className="form-group d-flex flex-row align-items-center justify-content-center">
        <label className=" fs-4">Department:</label>
        <div className="content fw-medium fs-4">{ticket.department}</div>
      </div>
      <div className="form-group d-flex flex-row align-items-center justify-content-center">
        <label className=" fs-4">Priority:</label>
        <div className="content fw-medium fs-4">{ticket.priority}</div>
      </div>
      <div className="form-group d-flex flex-row align-items-center justify-content-center">
        <label className=" fs-4">Message:</label>
        <div className="content fw-medium fs-4">{ticket.message}</div>
      </div>
      <div className="form-group d-flex flex-row align-items-center justify-content-center">
        <label className=" fs-4">Receiver ID:</label>
        <div className="content d-flex flex-row align-items-center justify-content-start">
          <select
            className="form-control fw-medium fs-5 w-50"
            value={ticket.receiver_id}
            onChange={(e) =>
              setTicket({ ...ticket, receiver_id: e.target.value })
            }
          >
            <option value="">Select Receiver</option>
            {receiverOptions.map((receiver) => (
              <option key={receiver.id} value={receiver.id}>
                {receiver.username}
              </option>
            ))}
          </select>
        </div>
      </div>
      {saved && (
        <div className="alert alert-success">Ticket has been assigned.</div>
      )}
      <button className="btn btn-success w-25 m-4" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  );
};

export default EditTicket;
