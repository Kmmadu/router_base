import { createContext, useState, useContext } from "react";

// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Add a users array (mock data or fetched data)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      location: "Lagos, Nigeria",
      ip: "192.168.1.1",
      router_info: "TP-Link Archer AX73",
      image_src: "https://picsum.photos/id/258/50/",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "User",
      status: "Active",
      location: "Kano, Nigeria",
      ip: "192.168.1.2",
      router_info: "Netgear Nighthawk AX12",
      image_src: "https://picsum.photos/id/366/50",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Editor",
      status: "Pending",
      location: "Abuja, Nigeria",
      ip: "192.168.1.3",
      router_info: "Asus RT-AX88U",
      image_src: "https://picsum.photos/id/42/50",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "User",
      status: "Active",
      location: "Port Harcourt, Nigeria",
      ip: "192.168.1.4",
      router_info: "Linksys EA9500",
      image_src: "https://picsum.photos/id/237/50",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert@example.com",
      role: "User",
      status: "Inactive",
      location: "Ibadan, Nigeria",
      ip: "192.168.1.5",
      router_info: "Google Nest Wifi",
      image_src: "https://picsum.photos/id/655/50",
    },
    {
      id: 6,
      name: "John Doe",
      email: "johndoe@example.com",
      role: "User",
      status: "Pending",
      location: "Enugu, Nigeria",
      ip: "192.168.1.6",
      router_info: "D-Link DIR-X1560",
      image_src: "https://picsum.photos/id/70/50",
    },
    ...Array.from({ length: 14 }, (_, i) => ({
      id: i + 7,
      name: `User ${i + 7}`,
      email: `user${i + 7}@example.com`,
      role: i % 2 === 0 ? "User" : "Editor",
      status: ["Active", "Pending", "Inactive"][i % 3],
      location:
        ["Benin", "Jos", "Uyo", "Owerri", "Kaduna"][i % 5] + ", Nigeria",
      ip: `192.168.1.${i + 7}`,
      router_info: [
        "Huawei AX3",
        "MikroTik hAP ac3",
        "Cisco RV340",
        "Zyxel Armor G5",
        "Tenda AC10",
      ][i % 5],
      image_src: `https://picsum.photos/id/${i + 300}/50`,
    })),
  ]);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser, users }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUser = () => useContext(UserContext);
