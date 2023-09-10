const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const isAuthenticated = require("../middleware/authmiddleware");

// Create a new ticket
router.post("/create", ticketController.createTicket);
//get pending tickets
router.get("/pending", isAuthenticated, ticketController.getPendingTickets);
//get active tickets
router.get("/active", isAuthenticated, ticketController.getActiveTickets);
//Get close tickets
router.get("/closed", isAuthenticated, ticketController.getClosedTickets);
router.get("/:ticketId", ticketController.getTicketById);
// Update a ticket (Assign to Receiver) - Admin Only
router.put("/update/:id", isAuthenticated, ticketController.updateTicket);

module.exports = router;
