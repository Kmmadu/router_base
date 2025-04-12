import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  EnvelopeIcon,
  SignalIcon,
  ChartPieIcon,
  DeviceTabletIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useDarkModeContext } from "../../../context/DarkModeContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  const navItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { name: "Customers", icon: UsersIcon, path: "/customers" },
    { name: "Messages", icon: EnvelopeIcon, path: "/messages" },
    { name: "Network Status", icon: SignalIcon, path: "/network-status" },
    { name: "Bandwidth Usage", icon: ChartPieIcon, path: "/bandwidth-usage" },
    { name: "Device Management", icon: DeviceTabletIcon, path: "/devices" },
    { name: "Security Logs", icon: ShieldCheckIcon, path: "/security-logs" },
    { name: "Settings", icon: Cog6ToothIcon, path: "/settings" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30 shadow-2xl shadow-[rgba(0,0,0,0.9)] dark:shadow[rgba(255,255,255,0.1)]`}
    >
      <div className="flex flex-col h-full w-64 bg-[var(--background)] border-r border-[var(--sidebar-border)]">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img
                src="https://picsum.photos/id/276/50"
                alt="R_B"
                className="rounded-full"
              />
            </div>
            <span className="text-xl font-semibold text-[var(--text-color)]">
              Router_Base
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-lg hover:bg-gray-500/20 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[var(--text-color)] hover:text-[var(--color-error-500)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-primary-500)] text-white"
                    : "text-[var(--text-color)] hover:bg-[var(--color-primary)] hover:text-white"
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--sidebar-border)] space-y-2">
          <button
            onClick={toggleDarkMode}
            className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-[var(--color-primary)] text-[var(--text-color)] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {isDarkMode ? (
              <>
                <SunIcon className="w-5 h-5 mr-3" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5 mr-3" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          <button className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-[var(--color-primary)] text-[var(--text-color)] hover:text-white transition-colors duration-200">
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
