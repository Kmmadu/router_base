import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useUser } from "../../../context/useUser";

const Navbar = ({ sidebarOpen, setSidebarOpen, users }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setSelectedUser } = useUser();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-20 bg-primary  shadow-lg shadow-black/50">
      <div className="flex items-center justify-between p-4">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg md:hidden hover:bg-primary-500  cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Search */}
          <div
            className={`absolute ${
              searchOpen
                ? "left-1/2 -translate-x-3/5 w-60 sm:w-80 lg:w-96 xl:w-96"
                : "right-2/5 md:right-2/5 lg:right-1/5 xl:right-1/5 -translate-x-1/2  w-0"
            } transition-all duration-300 ease-in-out`}
          >
            {!searchOpen ? (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-primary-500 cursor-pointer"
              >
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
              </button>
            ) : (
              <div className="relative w-64 sm:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border-none rounded-t-lg bg-gray-50 transition-all duration-300 ease-in-out 
          focus:border-none focus:outline-none focus:shadow-md focus:shadow-black/50"
                  placeholder="Search by name or email"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    setTimeout(() => {
                      setSearchQuery(""); // Clear input
                      setSearchOpen(false);
                    }, 200); // Delay to allow clicking search results
                  }}
                />
              </div>
            )}

            {/* 🔹 Filtered Results Dropdown */}
            {searchOpen && searchQuery && (
              <div className="absolute bg-white shadow-lg rounded-b-xl max-h-60 overflow-y-auto w-64 sm:w-80 z-50 border border-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-4 transition-all duration-200"
                      onClick={() => setSelectedUser(user)}
                    >
                      {/* Profile Picture */}
                      <img
                        src={user.image_src}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border border-gray-300"
                      />

                      {/* User Info */}
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-semibold">
                          {user.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-3 text-gray-500 text-center">
                    No users found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-700 cursor-pointer  relative">
            <BellIcon className="h-6 w-6 text-gray-400" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-300 flex items-center justify-center text-white font-bold">
              <img
                src="https://picsum.photos/id/1/50"
                alt="U"
                className="rounded-full"
              />
            </div>
            <span className="hidden md:inline-block font-medium dark:text-white">
              Swift
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
