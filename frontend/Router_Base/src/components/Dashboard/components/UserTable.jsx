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
  const [currentPage, setCurrentPage] = useState(1);
  const { setSelectedUser } = useUser();

  const pageSize = 5;

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

  const totalPages = Math.ceil(sortedUsers.length / pageSize);

  const paginatedUsers = useMemo(() => {
    if (limit) return sortedUsers.slice(0, limit);
    const start = (currentPage - 1) * pageSize;
    return sortedUsers.slice(start, start + pageSize);
  }, [sortedUsers, limit, currentPage]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-success-500 text-secondary dark:bg-green-600 dark:text-white";
      case "Pending":
        return "bg-warning-500 text-black dark:bg-yellow-400 dark:text-black";
      case "Inactive":
        return "bg-error-500 text-secondary dark:bg-red-600 dark:text-white";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white";
    }
  };

  const toggleVisibility = (id) => {
    setHiddenUsers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <div className="overflow-x-auto overflow-y-auto max-h-[27.5rem] rounded-md border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-black dark:divide-gray-200">
          <thead className="bg-gray-50 dark:bg-black/50">
            <tr>
              {[
                "id",
                "name",
                "email",
                "location",
                "ip",
                "router_info",
                "role",
                "status",
              ].map((key) => (
                <th
                  key={key}
                  onClick={() => requestSort(key)}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400"
                >
                  {key.replace("_", " ").toUpperCase()}{" "}
                  {sortConfig.key === key && (
                    <span>
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                  {key === "status" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        requestActiveFirst();
                      }}
                      className="ml-2 text-xs"
                    >
                      {sortConfig.activeFirst ? "★" : "☆"}
                    </button>
                  )}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-[var(--background)] divide-y divide-black dark:divide-gray-700">
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className=" transition-colors duration-300 ease-in-out"
                onClick={() => setSelectedUser(user)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={user.image_src}
                      alt={user.name}
                      className="flex-shrink-0 h-10 w-10 rounded-full shadow-lg"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {user.location}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {hiddenUsers[user.id] ? "****" : user.ip}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {hiddenUsers[user.id] ? "****" : user.router_info}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                      className="p-1 rounded-md text-black dark:text-white hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVisibility(user.id);
                      }}
                    >
                      {hiddenUsers[user.id] ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                      )}
                    </button>
                    <button className="p-1 rounded-md text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 hover:bg-yellow-50 cursor-pointer dark:hover:bg-yellow-900">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="p-1 rounded-md text-red-600 dark:text-red-400 hover:text-red-500 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!limit && totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-primary text-black rounded disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <span className="">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-primary text-black  rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default UserTable;
