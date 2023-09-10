const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "YourSecretKeyHere"; // Replace with a secure secret key
const Sender = require("../models/senderModel");
const Receiver = require("../models/receiverModel");
// Function to generate a JWT token
function generateToken(adminId) {
  return jwt.sign({ adminId }, secretKey, { expiresIn: "1h" });
}

// Create a new admin and return a JWT token
exports.createAdmin = async (req, res) => {
  try {
    // Extract admin data from the request body
    const { username, email, password, profile_picture } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin record in the database
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      profile_picture,
    });

    // Generate a JWT token for the newly created admin
    const token = generateToken(admin.id);

    // Respond with the JWT token and admin data
    res.status(201).json({ token, admin });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the admin." });
  }
};

// Login and return a JWT token
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email in the database
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token for the authenticated admin
    const token = generateToken(admin.id);

    // Respond with the JWT token and admin data
    res.json({ token, admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};

//get all sender
exports.getAllSenders = async (req, res) => {
  try {
    // Fetch all sender records from the database
    const senders = await Sender.findAll();

    // Respond with the list of senders
    res.json(senders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching senders." });
  }
};

//Delete Sender by ID
exports.deleteSenderById = async (req, res) => {
  try {
    const senderId = req.params.id;

    // Find the sender by ID and delete it
    const deletedSender = await Sender.destroy({
      where: {
        id: senderId,
      },
    });

    if (deletedSender === 1) {
      // Sender was deleted successfully
      res.json({ message: "Sender deleted successfully" });
    } else {
      // Sender with the provided ID was not found
      res.status(404).json({ error: "Sender not found" });
    }
  } catch (error) {
    console.error("Error deleting sender:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the sender" });
  }
};

//get all receiver
exports.getAllReceivers = async (req, res) => {
  try {
    // Fetch all sender records from the database
    const receivers = await Receiver.findAll();

    // Respond with the list of senders
    res.json(receivers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching senders." });
  }
};

//Delete Recevier by ID
exports.deleteReceiverById = async (req, res) => {
  try {
    const receiverId = req.params.id;

    // Find the sender by ID and delete it
    const deletedReceiver = await Receiver.destroy({
      where: {
        id: receiverId,
      },
    });

    if (deletedReceiver === 1) {
      // Sender was deleted successfully
      res.json({ message: "Receiver deleted successfully" });
    } else {
      // Sender with the provided ID was not found
      res.status(404).json({ error: "Receiver not found" });
    }
  } catch (error) {
    console.error("Error deleting Receiver:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Receiver" });
  }
};

// Approve a receiver by ID (Admin only)
exports.approveReceiver = async (req, res) => {
  const receiverId = req.params.id;

  try {
    // Find the receiver by ID in the database
    const receiver = await Receiver.findByPk(receiverId);

    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found." });
    }

    // Check if the user making the request is an admin (you may need to implement this check)
    const isAdmin = true; // You should implement a way to determine if the user is an admin

    if (!isAdmin) {
      return res
        .status(403)
        .json({ error: "Only admins can approve receivers." });
    }

    // Update the receiver's "approved" field to true
    receiver.isApproved = true;
    await receiver.save();

    res.json(receiver);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while approving the receiver." });
  }
};
// Get admin profile by ID
exports.getAdminProfile = async (req, res) => {
  const adminId = req.user.adminId; // Assuming your authMiddleware sets the adminId in the request

  try {
    // Find the admin by ID in the database
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    // Respond with the admin object
    res.json(admin);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the admin profile." });
  }
};
// Update admin profile by ID
exports.updateAdminProfile = async (req, res) => {
  const adminId = req.user.adminId; // Assuming your authMiddleware sets the adminId in the request

  try {
    // Find the admin by ID in the database
    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    // Update admin data based on the request body
    const { username, email, oldPassword, newPassword, profile_picture } =
      req.body;

    // Check if the old password is correct
    const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Old password is incorrect." });
    }

    // Hash the new password if it's provided
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
    }

    // Update other fields
    admin.username = username;
    admin.email = email;
    admin.profile_picture = profile_picture;

    // Save the updated admin data to the database
    await admin.save();

    // Respond with the updated admin object
    res.json(admin);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the admin profile." });
  }
};
