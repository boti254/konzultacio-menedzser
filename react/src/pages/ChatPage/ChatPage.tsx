import { useState } from "react";
import "./ChatPage.css";

function ChatPage() { 
  const [newMessage, setNewMessage] = useState<string>("");

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {/* {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <span className="timestamp">{message.timestamp}</span>
            <p>{message.content}</p>
          </div>
        ))} */}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={() => {
            return 0;
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
