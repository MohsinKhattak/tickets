const express = require("express");
const router = express.Router();
const senderController = require("../controllers/senderController");
const authMiddleware = require("../middleware/authmiddleware");

// Create a new sender (registration)
router.post("/register", senderController.createSender);

// Login and get a JWT token
router.post("/login", senderController.loginSender);

// Get sender by ID (requires authentication)
router.get("/", authMiddleware, senderController.getSenderById);

// Update sender by ID (requires authentication)
router.put("/", authMiddleware, senderController.updateSenderById);

// Delete sender by ID (requires authentication)
router.delete("/", authMiddleware, senderController.deleteSenderById);

//active tickets related to this senders
router.get('/active', authMiddleware, senderController.getActiveTickets)

//closed tickets related to this senders
router.get('/closed', authMiddleware, senderController.getClosedTickets )

router.get('/pending', authMiddleware, senderController.getPendingTickets )

module.exports = router;
