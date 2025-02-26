const express = require("express");
const { ActiveCustomer } = require("../models/ActiveCustomer");
const router = express.Router();

// Fetch Customers Endpoint
router.get("/customers", async (req, res) => {
  try {
    const customers = await ActiveCustomer.findAll();
    res.status(200).json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching customers" });
  }
});

module.exports = router;