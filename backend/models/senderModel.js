const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const senderModel = sequelize.define("senders", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensure it's a valid email format
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, // You can set this as per your requirements
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true, // You can set this as per your requirements
  },
});

module.exports = senderModel;
