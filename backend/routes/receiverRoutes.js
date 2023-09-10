const express = require("express");
const router = express.Router();
const receiverController = require("../controllers/receiverController");
const isAuthenticated = require("../middleware/authmiddleware");

// Register a new receiver
router.post("/register", receiverController.createReceiver);

// Login as a receiver
router.post("/login", receiverController.loginReceiver);
// Route to get tickets assigned to a particular receiver
router.get(
  "/tickets",
  isAuthenticated,
  receiverController.getTicketsByReceiver
);
//Route to close ticket
router.put("/tickets/:id", isAuthenticated, receiverController.closeTicket);

// Route to get reciever
router.get("/", isAuthenticated, receiverController.getReciverById);

router.get('/active', isAuthenticated, receiverController.getActiveTickets);

router.get('/closed', isAuthenticated, receiverController.getClosedTickets );

router.get('/pending', isAuthenticated, receiverController.getPendingTickets );

module.exports = router;
