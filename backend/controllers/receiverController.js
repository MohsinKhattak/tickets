const Receiver = require("../models/receiverModel");
const Ticket = require("../models/ticketModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "YourSecretKeyHere"; // Replace with a secure secret key

// Function to hash the password
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Function to generate a JWT token
function generateToken(receiverId) {
  return jwt.sign({ receiverId }, secretKey, { expiresIn: "1h" });
}

// Create a new receiver and return a JWT token
exports.createReceiver = async (req, res) => {
  try {
    const { username, email, password, profile_picture } = req.body;

    // Check if the email is already in use
    const existingReceiver = await Receiver.findOne({ where: { email } });

    if (existingReceiver) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    // Hash the password before storing it
    const hashedPassword = await hashPassword(password);

    // Create a new receiver record in the database with "approved" set to false
    const receiver = await Receiver.create({
      username,
      email,
      password: hashedPassword,
      profile_picture,
      approved: false, // Initially, receivers are not approved
    });

    // Generate a JWT token for the newly created receiver
    const token = generateToken(receiver.id);

    // Respond with the JWT token and receiver data
    res.status(201).json({ token, receiver });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the receiver." });
  }
};

// Login and return a JWT token
exports.loginReceiver = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the receiver by email in the database
    const receiver = await Receiver.findOne({ where: { email } });

    if (!receiver) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Check if the receiver is approved
    if (!receiver.isApproved) {
      return res
        .status(401)
        .json({ error: "Your account has not been approved yet." });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, receiver.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token for the authenticated receiver
    const token = generateToken(receiver.id);

    // Respond with the JWT token and receiver data
    res.json({ token, receiver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};
//Get receiver's assigned Tickets
exports.getTicketsByReceiver = async (req, res) => {
  try {
    const receiverId = req.user.receiverId; // Get the receiverId from the authenticated user's token

    // Find all tickets where receiver_id matches the receiverId
    const tickets = await Ticket.findAll({
      where: { receiver_id: receiverId },
    });

    // Respond with the list of tickets
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching tickets." });
  }
};
// Close a ticket by ID (Receiver only)
exports.closeTicket = async (req, res) => {
  const ticketId = req.params.id;
  const { comment } = req.body;

  try {
    const receiverId = req.user.receiverId; // Assuming you have set the receiver ID in the authentication middleware

    const ticket = await Ticket.findByPk(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    // Check if the user making the request is the assigned receiver
    if (ticket.receiver_id !== receiverId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to close this ticket." });
    }

    // Only allow closing if the ticket is in the "active" phase
    if (ticket.phase !== "active") {
      return res
        .status(400)
        .json({ error: "Ticket cannot be closed in the current phase." });
    }

    // Update ticket data to close it
    ticket.phase = "closed";
    ticket.comment = comment;

    await ticket.save();

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while closing the ticket." });
  }
};

// Get reciever by ID
exports.getReciverById = async (req, res) => {
  const revieverId = req.user.receiverId;
  console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
  try {
    // Find the reciever by ID in the database
    const reciver = await Receiver.findByPk(revieverId);

    if (!reciver) {
      return res.status(404).json({ error: "receiver not found." });
    }
    console.log(reciver)
    res.json(reciver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the sender." });
  }
};

// Get a list of all pending tickets
exports.getActiveTickets = async (req, res) => {
  try {
    const id = req.user.receiverId;
    const activeTickets = await Ticket.findAll({
      where: { phase: "active" , receiver_id: id},
    });
    res.json(activeTickets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pending tickets." });
  }
};

exports.getClosedTickets = async (req, res) => {
  try {
    const id = req.user.receiverId;
    console.log('reciver controller ', id)
    const activeTickets = await Ticket.findAll({
      where: { phase: "closed" , receiver_id: id},
    });
    res.json(activeTickets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pending tickets." });
  }
};

exports.getPendingTickets = async (req, res) => {
  try {
    const id = req.user.receiverId;
    console.log('reciver controller ', id)
    const activeTickets = await Ticket.findAll({
      where: { phase: "pending" , receiver_id: id},
    });
    res.json(activeTickets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pending tickets." });
  }
};

