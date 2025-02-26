const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customers");

// Import models (optional, only needed if you want to sync them explicitly)
const ISP = require("./models/ISP");
const ActiveCustomer = require("./models/ActiveCustomer");
const InactiveCustomer = require("./models/InactiveCustomer");
const Router = require("./models/Router");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api", authRoutes); // Authentication routes (register, login)
app.use("/api", customerRoutes); // Customer routes (fetch customers)

// Sync database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});