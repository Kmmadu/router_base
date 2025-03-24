const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Slybaron@88",
  database: "router_base",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Router_Base API is running!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
