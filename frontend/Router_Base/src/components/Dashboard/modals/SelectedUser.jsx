import { XMarkIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../../context/useUser";
import { useMessage } from "../../../context/useMessage";
import { useNavigate } from "react-router-dom";

const SelectedUser = () => {
  const { openChat } = useMessage();
  const { selectedUser, setSelectedUser } = useUser();
  const navigate = useNavigate();

  if (!selectedUser) return null;

  return (
    <div
      className="fixed inset-0 flex z-10 items-center justify-center bg-[rgba(0,0,0,0.6)] bg-opacity-40 backdrop-blur-md"
      onClick={() => setSelectedUser(null)}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full transform transition-all scale-100 md:translate-x-30 md:translate-y-0 "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">User Details</h2>
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
            onClick={() => setSelectedUser(null)}
          >
            <XMarkIcon className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* User Image */}
        <div className="flex items-center space-x-4">
          <img
            src={selectedUser.image_src}
            alt={selectedUser.name}
            className="h-14 w-14 rounded-full shadow-md"
          />
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {selectedUser.name}
            </p>
            <p className="text-sm text-gray-500">{selectedUser.email}</p>
          </div>
        </div>

        {/* User Details */}
        <section className="relative ">
          <div className="mt-4 space-y-2">
            <p className="text-sm">
              <strong className="text-gray-700">Role:</strong>{" "}
              {selectedUser.role}
            </p>
            <p className="text-sm">
              <strong className="text-gray-700">Status:</strong>{" "}
              {selectedUser.status}
            </p>
            <p className="text-sm">
              <strong className="text-gray-700">Location:</strong>{" "}
              {selectedUser.location}
            </p>
            <p className="text-sm">
              <strong className="text-gray-700">IP Address:</strong>{" "}
              {selectedUser.ip}
            </p>
            <p className="text-sm">
              <strong className="text-gray-700">Router Model:</strong>{" "}
              {selectedUser.router_info}
            </p>
          </div>

          <div className="text-sm absolute right-1 bottom-1">
            <button
              className="bg-primary rounded hover:text-black cursor-pointer transition duration-300 border-[1px] border-white hover:border-primary hover:bg-white p-3 py-2"
              onClick={() => {
                openChat(selectedUser);
                setSelectedUser(null);
                navigate("/messages");
              }}
            >
              Message {selectedUser.name.split(" ")[0]}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SelectedUser;
