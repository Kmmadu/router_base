import { useState } from "react"; // Import useState
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "./components/Registration/LandingPage";
import Signup from "./components/Registration/Signup";
import Login from "./components/Registration/Login";
import VerifyOTP from "./components/Registration/VerifyOTP";
import Sidebar from "./components/Dashboard/components/Sidebar";
import Navbar from "./components/Dashboard/components/Navbar";
import Dashboard from "./components/Dashboard/pages/Dashboard";
import Customers from "./components/Dashboard/pages/Customers";
import Messages from "./components/Dashboard/pages/messages/Messages";
import { UserProvider } from "./context/useUser";
import { MessageProvider } from "./context/MessageContext";
import SelectedUser from "./components/Dashboard/modals/SelectedUser";

const users = [
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
    location: ["Benin", "Jos", "Uyo", "Owerri", "Kaduna"][i % 5] + ", Nigeria",
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
];

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.1 }}
  >
    {children}
  </motion.div>
);

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`flex h-screen bg-white`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 overflow-auto">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          users={users}
        />

        <main className="p-4 md:p-6">{children}</main>
        <SelectedUser />
      </div>
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PageTransition>
              <VerifyOTP />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <PageTransition>
                <Dashboard users={users} />
              </PageTransition>
            </DashboardLayout>
          }
        />
        <Route
          path="/Customers"
          element={
            <DashboardLayout>
              <PageTransition>
                <Customers users={users} />
              </PageTransition>
            </DashboardLayout>
          }
        />
        <Route
          path="/Messages"
          element={
            <DashboardLayout>
              <PageTransition>
                <Messages users={users} />
              </PageTransition>
            </DashboardLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <UserProvider>
      <MessageProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </MessageProvider>
    </UserProvider>
  );
}

export default App;
