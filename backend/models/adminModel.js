const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Admin = sequelize.define("admins", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Admin;
