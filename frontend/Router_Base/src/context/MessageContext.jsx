import { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [showWindow, setShowWindow] = useState(false);

  // Function to send a message
  const sendMessage = (userId, text) => {
    if (!text.trim()) return;
    setMessages((prev) => ({
      ...prev,
      [userId]: [
        ...(prev[userId] || []),
        { text, sender: "me", timestamp: Date.now() },
      ],
    }));
  };

  // Function to open chat with a user
  const openChat = (user) => {
    setSelectedChat(user);
    setShowWindow(true);
  };

  return (
    <MessageContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        messages,
        sendMessage,
        showWindow,
        setShowWindow,
        openChat,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
