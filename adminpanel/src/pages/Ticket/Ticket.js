import React, { useState, useEffect } from "react";
import "./Ticket.css";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { UseSelector, useSelector } from "react-redux";
const Ticket = () => {
  const [pendingTickets, setPendingTickets] = useState([]);
  const [activeTickets, setActiveTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    fetchPendingTickets();
    fetchActiveTickets();
    fetchClosedTickets();
  }, []);

  const fetchPendingTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/ticket/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
          },
        }
      );
      setPendingTickets(response.data);
    } catch (error) {
      console.error("Error fetching pending tickets:", error);
    }
  };

  const fetchActiveTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/ticket/active",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
          },
        }
      );
      setActiveTickets(response.data);
    } catch (error) {
      console.error("Error fetching active tickets:", error);
    }
  };

  const fetchClosedTickets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/ticket/closed",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
          },
        }
      );
      setClosedTickets(response.data);
    } catch (error) {
      console.error("Error fetching closed tickets:", error);
    }
  };

  return (
    <div className="page">
      <div className="col-sm-12 d-flex pt-5 flex-column justify-content-start">
        <h3 className="text-black mb-3">Pending Tickets</h3>
        <div className="col-11">
          <table className="table table-bordered table-striped shadow-lg">
            <thead>
              <tr>
                <th scope="col">U-id</th>
                <th scope="col">Subject</th>
                <th scope="col">Department</th>
                <th scope="col">Priority</th>
                <th scope="col">Message</th>
                <th className="col">Receiver ID</th>
                <th className="col">Sender ID</th>
                <th className="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <th scope="row">{ticket.id}</th>
                  <td>{ticket.subject}</td>
                  <td>{ticket.department}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.message}</td>
                  <td>{ticket.receiver_id}</td>
                  <td>{ticket.sender_id}</td>

                  <td className="d-flex flex-row justify-content-around">
                    <Link to={`/editTicket/${ticket.id}`} className="link-info">
                      <button className="btn btn-info ">Edit</button>
                    </Link>
                    <button className="btn btn-danger ">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Tickets */}
      <div className="col-sm-12 d-flex pt-5 flex-column justify-content-start">
        <h3 className="text-black mb-3">Active Tickets</h3>
        <div className="col-11">
          <table className="table table-bordered table-striped shadow-lg">
            <thead>
              <tr>
                <th scope="col">U-id</th>
                <th scope="col">Subject</th>
                <th scope="col">Department</th>
                <th scope="col">Priority</th>
                <th scope="col">Message</th>
                <th className="col">Receiver ID</th>
                <th className="col">Sender ID</th>
                <th className="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <th scope="row">{ticket.id}</th>
                  <td>{ticket.subject}</td>
                  <td>{ticket.department}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.message}</td>
                  <td>{ticket.receiver_id}</td>
                  <td>{ticket.sender_id}</td>

                  <td className="d-flex flex-row justify-content-around">
                    <Link to={`/editTicket/${ticket.id}`} className="link-info">
                      <button className="btn btn-info ">Edit</button>
                    </Link>
                    <button className="btn btn-danger ">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-sm-12 d-flex pt-5 flex-column justify-content-start">
        <h3 className="text-black mb-3">Closed Tickets</h3>
        <div className="col-11">
          <table className="table table-bordered table-striped shadow-lg">
            <thead>
              <tr>
                <th scope="col">U-id</th>
                <th scope="col">Subject</th>
                <th scope="col">Department</th>
                <th scope="col">Priority</th>
                <th scope="col">Message</th>
                <th className="col">Receiver ID</th>
                <th className="col">Sender ID</th>
                <th className="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {closedTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <th scope="row">{ticket.id}</th>
                  <td>{ticket.subject}</td>
                  <td>{ticket.department}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.message}</td>
                  <td>{ticket.receiver_id}</td>
                  <td>{ticket.sender_id}</td>

                  <td className="d-flex flex-row justify-content-around">
                    <button className="btn btn-danger ">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
