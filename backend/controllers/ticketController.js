const Ticket = require("../models/ticketModel");
const jwt = require("jsonwebtoken");
const secretKey = "YourSecretKeyHere";
// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const {
      subject,
      department,
      related_service,
      priority,
      message,
      attachment,
    } = req.body;

    // Extract the sender ID from the JWT in the request headers
    const token = req.headers.authorization; // Assuming you send the token in the authorization header

    if (!token) {
      return res.status(401).json({ error: "Token is missing." });
    }

    try {
      const decodedToken = jwt.verify(token.replace("Bearer ", ""), secretKey);
      const sender_id = decodedToken.senderId;

      const ticket = await Ticket.create({
        subject,
        department,
        related_service,
        priority,
        message,
        attachment,
        sender_id, // Use the sender's ID from the JWT
      });

      res.status(201).json(ticket);
    } catch (tokenError) {
      console.error(tokenError);
      return res.status(401).json({ error: "Invalid token." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the ticket." });
  }
};

// Get a list of all pending tickets
exports.getPendingTickets = async (req, res) => {
  try {
    // Find all tickets with the "pending" phase
    const pendingTickets = await Ticket.findAll({
      where: { phase: "pending" },
    });

    res.json(pendingTickets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pending tickets." });
  }
};

// Get a list of all pending tickets
exports.getActiveTickets = async (req, res) => {
  try {
    const activeTickets = await Ticket.findAll({
      where: { phase: "active" },
    });
    console.log(activeTickets)
    console.log('inside acrive ticket')
    res.json(activeTickets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pending tickets." });
  }
};

// Get a ticket by ID and phase
exports.getTicketById = async (req, res) => {
  const ticketId = req.params.ticketId;

  try {
    // Find the ticket by ID and phase in your database (replace with your actual model and database logic)
    const ticket = await Ticket.findOne({
      where: { id: ticketId },
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Send the ticket data as a JSON response
    res.json(ticket);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the ticket" });
  }
};

// Get a list of all pending tickets
exports.getClosedTickets = async (req, res) => {
  try {
    const closedTickets = await Ticket.findAll({
      where: { phase: "closed" },
    });

    res.json(closedTickets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pending tickets." });
  }
};

// Update a ticket by ID (Admin only)
exports.updateTicket = async (req, res) => {
  const ticketId = req.params.id;
  const { receiver_id } = req.body;

  try {
    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    // Check if the user making the request is an admin (you may need to implement this check)
    const isAdmin = true; // You should implement a way to determine if the user is an admin

    if (!isAdmin) {
      return res.status(403).json({ error: "Only admins can assign tickets." });
    }

    // Update ticket data based on the request body
    ticket.phase = "active"; // Automatically set the phase to "active" when assigning
    ticket.receiver_id = receiver_id;

    await ticket.save();

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the ticket." });
  }
};
