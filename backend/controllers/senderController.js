const Sender = require("../models/senderModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Ticket = require("../models/ticketModel");
const secretKey = "YourSecretKeyHere"; // Replace with a secure secret key

// Function to generate a JWT token
function generateToken(senderId) {
  return jwt.sign({ senderId }, secretKey, { expiresIn: "1h" });
}

// Create a new sender and return a JWT token
exports.createSender = async (req, res) => {
  try {
    // Extract sender data from the request body
    const { username, email, phone, password, address, profile_picture } =
      req.body;View

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new sender record in the database
    const sender = await Sender.create({
      username,
      email,
      phone,
      password: hashedPassword,
      address,
      profile_picture,
    });

    // Generate a JWT token for the newly created sender
    const token = generateToken(sender.id);

    // Respond with the JWT token and sender data
    res.status(201).json({ token, sender });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the sender." });
  }
};

// Login and return a JWT token
exports.loginSender = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the sender by email in the database
    const sender = await Sender.findOne({ where: { email } });

    if (!sender) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, sender.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token for the authenticated sender
    const token = generateToken(sender.id);

    // Respond with the JWT token and sender data
    res.json({ token, sender });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};

// Get sender by ID
exports.getSenderById = async (req, res) => {
  const senderId = req.user.senderId;
  console.log('getting sender by id', senderId)
  try {
    // Find the sender by ID in the database
    const sender = await Sender.findByPk(senderId);

    if (!sender) {
      return res.status(404).json({ error: "Sender not found." });
    }

    // Respond with the sender object
    res.json(sender);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the sender." });
  }
};

// Update sender by ID
exports.updateSenderById = async (req, res) => {
  const senderId = req.user.senderId;
  console.log('inside update', senderId)
  try {
    // Find the sender by ID in the database
    const sender = await Sender.findByPk(senderId);

    if (!sender) {
      return res.status(404).json({ error: "Sender not found." });
    }

    // Update sender data based on the request body
    const { username, email, phone, password, address, profile_picture } =
      req.body;

    // Hash the new password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      sender.password = hashedPassword;
    }

    // Update other fields
    sender.username = username;
    sender.email = email;
    sender.phone = phone;
    sender.address = address;
    sender.profile_picture = profile_picture;

    // Save the updated sender data to the database
    await sender.save();

    // Respond with the updated sender object
    res.json(sender);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the sender." });
  }
};

// Delete sender by ID
exports.deleteSenderById = async (req, res) => {
  const senderId = req.user.senderId;

  try {
    // Find the sender by ID in the database
    const sender = await Sender.findByPk(senderId);

    if (!sender) {
      return res.status(404).json({ error: "Sender not found." });
    }

    // Delete the sender from the database
    await sender.destroy();

    // Respond with a success message
    res.json({ message: "Sender deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the sender." });
  }
};


exports.getActiveTickets = async (req, res) => {
  try {
    const id = req.user.senderId;
    const activeTickets = await Ticket.findAll({
      where: { phase: "active" , sender_id: id},
    });
    console.log(activeTickets)
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
    const id = req.user.senderId;
    const activeTickets = await Ticket.findAll({
      where: { phase: "closed" , id: id},
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
    const id = req.user.senderId;
    const activeTickets = await Ticket.findAll({
      where: { phase: "pending" , id: id},
    });
    res.json(activeTickets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pending tickets." });
  }
};