import { useEffect, useRef, useState } from "react";
import "./ChatPage.css";
import BackButton from "../../components/BackButton/BackButton";
import { useParams } from "react-router-dom";
import { useMessages } from "../../hooks/useMessages";

function ChatPage() {
  const [newMessage, setNewMessage] = useState<string>("");

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const { data, fetchMessages, sendMessage } = useMessages();
  const { id } = useParams();

  const myDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMessages(
      `https://szoftarch.webgravir.hu/api/chat/messages-from/${id}`
    );
  }, []);

  useEffect(() => {
    const fetchData = () => {
      if (myDivRef.current) {
        myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
      }
      fetchMessages(
        `https://szoftarch.webgravir.hu/api/chat/messages-from/${id}`
      );
    };

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSend = () => {
    sendMessage(
      `https://szoftarch.webgravir.hu/api/chat/send-to/${id}`,
      newMessage
    );
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <BackButton linkTo={"/chat-contacts"} />
      <div ref={myDivRef} className="chat-messages">
        {data?.map((message, index) => (
          <div
            key={index}
            className={
              message.from_user_id === Number(id)
                ? "from-style message"
                : "message"
            }
          >
            <span className="timestamp">{message.created_at}</span>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          className="chat-input km-input"
          type="text"
          placeholder="Üzenet..."
          value={newMessage}
          onChange={handleMessage}
        />
        <button className="km-button" onClick={handleSend}>
          Küldés
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
