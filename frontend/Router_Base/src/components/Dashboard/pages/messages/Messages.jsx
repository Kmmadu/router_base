import MessageSidebar from "./MessageSidebar";
import MessageWindow from "./MessageWindow";
import { useUser } from "../../../../context/useUser";
import { useMessage } from "../../../../context/useMessage";

const Messages = () => {
  const { users } = useUser();
  const { selectedChat, showWindow, setShowWindow } = useMessage();

  return (
    <div className="w-full">
      {showWindow ? (
        <MessageWindow onClose={() => setShowWindow(false)} />
      ) : (
        <MessageSidebar users={users} selectedChat={selectedChat} />
      )}
    </div>
  );
};

export default Messages;
