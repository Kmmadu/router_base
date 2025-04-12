import { useMessage } from "../../../../context/useMessage";
import { useDarkModeContext } from "../../../../context/DarkModeContext";

const MessageSidebar = ({ users = [], onOpen }) => {
  const { setSelectedChat, openChat } = useMessage();
  const { isDarkMode } = useDarkModeContext();

  return (
    <div className="bg-[var(--background)] ">
      <div className="p-4 flex items-center justify-between shadow-xl ">
        <h2 className="text-xl font-semibold text-primary">Messages</h2>
      </div>
      <div className="flex-1 h-[70vh] overflow-y-auto space-y-2 p-4 ">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            No messages available.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                setSelectedChat(user);
                openChat(user);
                onOpen?.();
              }}
              className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-all hover:bg-primary`}
            >
              <img
                src={user.image_src}
                alt={user.name}
                className="w-12 h-12 rounded-full border"
              />
              <div className="flex flex-col">
                <span className="font-medium ">{user.name}</span>
                <span className="text-sm text-gray-500">
                  Last seen recently
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageSidebar;
