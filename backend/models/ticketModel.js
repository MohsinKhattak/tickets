const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Sender = require("../models/senderModel");
const Receiver = require("../models/receiverModel");
const Ticket = sequelize.define("tickets", {
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  related_service: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attachment: {
    type: DataTypes.STRING, // You can adjust the data type according to your needs
    allowNull: true,
  },
  phase: {
    type: DataTypes.ENUM("pending", "active", "closed"),
    defaultValue: "pending",
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  comment: {
    type: DataTypes.TEXT, // Added the comment field
    allowNull: true,
  },
});

// Define associations
Ticket.belongsTo(Sender, { foreignKey: "sender_id" });
Ticket.belongsTo(Receiver, { foreignKey: "receiver_id" });

module.exports = Ticket;
