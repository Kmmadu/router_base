CREATE DATABASE router_base;

USE router_base;

-- Table for storing ISP details
CREATE TABLE ISPs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing Active Customers
CREATE TABLE Active_Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isp_id INT,  -- Foreign key linking to ISP
    router_interface VARCHAR(255),
    ssid VARCHAR(255),
    customer_name VARCHAR(255) NOT NULL,
    ip_address VARCHAR(50),
    mac_address VARCHAR(50),
    pop_location VARCHAR(255),
    bandwidth VARCHAR(50),
    state VARCHAR(255),
    lga VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (isp_id) REFERENCES ISPs(id) ON DELETE CASCADE
);

-- Table for storing Inactive Customers
CREATE TABLE Inactive_Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isp_id INT,  -- Foreign key linking to ISP
    router_interface VARCHAR(255),
    ssid VARCHAR(255),
    customer_name VARCHAR(255) NOT NULL,
    ip_address VARCHAR(50),
    mac_address VARCHAR(50),
    pop_location VARCHAR(255),
    bandwidth VARCHAR(50),
    state VARCHAR(255),
    lga VARCHAR(255),
    deactivated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (isp_id) REFERENCES ISPs(id) ON DELETE CASCADE
);

