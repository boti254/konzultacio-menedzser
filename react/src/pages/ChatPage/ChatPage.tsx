import { useState } from "react";
import "./ChatPage.css";
import BackButton from "../../components/BackButton/BackButton";

function ChatPage() { 
  const [newMessage, setNewMessage] = useState<string>("");

  return (
    <div className="chat-container">
    <BackButton linkTo={"/menu"} />
      <div className="chat-messages">
        {/* {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <span className="timestamp">{message.timestamp}</span>
            <p>{message.content}</p>
          </div>
        ))} */}
      </div>
      <div className="chat-container">
        <input className="chat-input"
          type="text"
          placeholder="Üzenet..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="km-button"
          onClick={() => {
            return 0;
          }}
        >
          Küldés
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
