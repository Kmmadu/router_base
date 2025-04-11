import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useState, useMemo } from "react";
import { useUser } from "../../../context/useUser";

const UserTable = ({ limit, users }) => {
  const [hiddenUsers, setHiddenUsers] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
    activeFirst: false,
  });
  const { setSelectedUser } = useUser();

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];

    if (sortConfig.activeFirst) {
      sortableUsers.sort((a, b) => {
        if (a.status === "Active" && b.status !== "Active") return -1;
        if (a.status !== "Active" && b.status === "Active") return 1;
        return 0;
      });
    }

    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction, activeFirst: false });
  };

  const requestActiveFirst = () => {
    setSortConfig((prev) => ({
      ...prev,
      activeFirst: !prev.activeFirst,
    }));
  };

  const displayedUsers = limit ? sortedUsers.slice(0, limit) : sortedUsers;

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-success-500 text-secondary ";
      case "Pending":
        return "bg-warning-500 text-black ";
      case "Inactive":
        return "bg-error-500 text-secondary ";
      default:
        return "bg-gray-100 text-gray-800 ";
    }
  };

  const toggleVisibility = (id) => {
    setHiddenUsers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[27rem] rounded-sm border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-black">
        <thead className="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => requestSort("id")}
            >
              ID{" "}
              {sortConfig.key === "id" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => requestSort("name")}
            >
              Name{" "}
              {sortConfig.key === "name" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => requestSort("email")}
            >
              Email{" "}
              {sortConfig.key === "email" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => requestSort("location")}
            >
              Location{" "}
              {sortConfig.key === "location" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => requestSort("ip")}
            >
              IP Address{" "}
              {sortConfig.key === "ip" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => requestSort("router_info")}
            >
              Router Model{" "}
              {sortConfig.key === "router_info" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => requestSort("role")}
            >
              Role{" "}
              {sortConfig.key === "role" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => requestSort("status")}
            >
              Status{" "}
              {sortConfig.key === "status" && (
                <span>{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  requestActiveFirst();
                }}
                className="ml-2 text-xs"
              >
                {sortConfig.activeFirst ? "★" : "☆"}
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y-black divide-black overflow-auto">
          {displayedUsers.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-200 transition-colors"
              onClick={() => {
                setSelectedUser(user);
              }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={user.image_src}
                    alt={user.name}
                    className="flex-shrink-0 h-10 w-10 rounded-full shadow-lg shadow-[rgba(0,0,0,0.5)] flex items-center justify-center font-bold"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                {user.location}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                {hiddenUsers[user.id] ? "****" : user.ip}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                {hiddenUsers[user.id] ? "****" : user.router_info}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    user.status
                  )}`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    className="p-1 rounded-md text-black cursor-pointer hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVisibility(user.id);
                    }}
                  >
                    {hiddenUsers[user.id] ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  <button className="p-1 rounded-md text-warning-500 cursor-pointer hover:text-yellow-400 hover:bg-yellow-50">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="p-1 rounded-md text-error-500 cursor-pointer hover:text-red-400 hover:bg-red-50">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
