const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAuthenticated = require("../middleware/authmiddleware");

// Admin login route
router.post("/login", adminController.loginAdmin);

//Admin Register
router.post("/register", adminController.createAdmin);
//get all senders
router.get("/senders", adminController.getAllSenders);
//get all receiver
router.get("/receivers", adminController.getAllReceivers);
//Approve Receivers Account
router.put("/approve-receiver/:id", adminController.approveReceiver);
//Delete Sender by ID
router.delete("/delete-sender/:id", adminController.deleteSenderById);
//Delete Receiver by ID
router.delete("/delete-receiver/:id", adminController.deleteReceiverById);
//Get Admin Profile
router.get("/profile", isAuthenticated, adminController.getAdminProfile);
//Update Admin Profile
router.put("/profile", isAuthenticated, adminController.updateAdminProfile);

module.exports = router;
