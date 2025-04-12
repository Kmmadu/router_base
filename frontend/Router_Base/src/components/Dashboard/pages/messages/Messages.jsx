import MessageSidebar from "./MessageSidebar";
import MessageWindow from "./MessageWindow";
import { useUser } from "../../../../context/useUser";
import { useMessage } from "../../../../context/useMessage";

const Messages = () => {
  const { users } = useUser();
  const { selectedChat, showWindow, setShowWindow } = useMessage();

  return (
    <div className="w-full p-4 md:p-6 bg-[var(--background)] h-[91vh]">
      {showWindow ? (
        <MessageWindow onClose={() => setShowWindow(false)} />
      ) : (
        <MessageSidebar users={users} selectedChat={selectedChat} />
      )}
    </div>
  );
};

export default Messages;
