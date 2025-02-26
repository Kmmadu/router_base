import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers");
        setCustomers(response.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Dashboard</h1>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>IP Address</th>
              <th>MAC Address</th>
              <th>State</th>
              <th>LGA</th>
              <th>Router ID</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customer_id}>
                <td>{customer.customer_name}</td>
                <td>{customer.ip_address}</td>
                <td>{customer.mac_address}</td>
                <td>{customer.state}</td>
                <td>{customer.lga}</td>
                <td>{customer.router_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#F5F5F5",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    color: "#1A73E8",
    marginBottom: "1rem",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  th: {
    padding: "1rem",
    backgroundColor: "#1A73E8",
    color: "#FFFFFF",
    textAlign: "left",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #CCC",
  },
};

export default Dashboard;