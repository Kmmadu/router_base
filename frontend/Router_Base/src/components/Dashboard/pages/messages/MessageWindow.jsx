import { useState, useEffect, useRef } from "react";
import { useMessage } from "../../../../context/useMessage";
import { ArrowLeft, Smile, Send } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
// import { ReceivedSkeleton, SentSkeleton } from "../../loader/MessageLoader";

const MessageWindow = ({ onClose }) => {
  const { selectedChat, messages, sendMessage } = useMessage();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji.emoji);
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages[selectedChat.id]]);

  return (
    <div className="flex flex-col h-[80vh] bg-gray-50">
      {/* Chat Header */}
      <div className="p-3 flex items-center sticky top-0 bg-white shadow-lg">
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <img
          src={selectedChat.image_src}
          alt={selectedChat.name}
          className="w-10 h-10 ml-3 rounded-full mr-3"
        />
        <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Change the condition to isLoading when backend */}
        {
          /* !newMessage ? (
          <>
            <ReceivedSkeleton />
            <SentSkeleton />
          </>
        ) : */
          (messages[selectedChat.id] || []).map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[50%] break-words shadow-md ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))
        }
        {/* Invisible div to keep the latest message in view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 border-t flex items-center bg-white sticky bottom-0 shadow-md ">
        {showEmojiPicker && (
          <div className="absolute bottom-14 left-3 bg-white shadow-lg rounded-lg">
            <EmojiPicker onEmojiClick={addEmoji} />
          </div>
        )}

        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-gray-500 hover:text-gray-700 transition"
        >
          <Smile size={24} />
        </button>

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-3 border rounded-full mx-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && newMessage.trim()) {
              sendMessage(selectedChat.id, newMessage);
              setNewMessage("");
            }
          }}
        />

        <button
          onClick={() => {
            if (newMessage.trim()) {
              sendMessage(selectedChat.id, newMessage);
              setNewMessage("");
            }
          }}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageWindow;
