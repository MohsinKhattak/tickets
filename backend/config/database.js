const { Sequelize } = require("sequelize");

// Create a Sequelize instance and specify the database connection details
const sequelize = new Sequelize("ticketsupport", "root", "", {
  host: "localhost", // Change this to your database host
  dialect: "mysql", // Change this to your database dialect (e.g., 'postgres' for PostgreSQL)
  port: 3306, // Change this to your database port
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
