const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const senderRoutes = require("./routes/senderRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const adminRoutes = require("./routes/adminRoutes");
const receiverRoutes = require("./routes/receiverRoutes");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Use cors middleware
app.use(cors());

// Routes
app.use("/api/sender", senderRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/receiver", receiverRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
