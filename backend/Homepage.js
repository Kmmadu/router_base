import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Router Base</h1>
      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}>
          Login
        </Link>
        <Link to="/register" style={styles.button}>
          Register
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#F5F5F5",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#1A73E8",
    marginBottom: "2rem",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#1A73E8",
    color: "#FFFFFF",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default Homepage;