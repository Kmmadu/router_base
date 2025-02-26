const express = require("express");
const sequelize = require("./config/db");
const ISP = require("./models/ISP");
const ActiveCustomer = require("./models/ActiveCustomer");
const InactiveCustomer = require("./models/InactiveCustomer");
const Router = require("./models/Router");

const app = express();
const PORT = process.env.PORT || 5000;

// Sync database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});