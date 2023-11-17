import { useEffect, useState } from 'react';
import './ChatPage.css';

function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  // Assume your backend endpoint for fetching messages is '/api/messages'
  const fetchMessageHistory = async () => {
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const messageHistory = await response.json();
        setMessages(messageHistory);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    // Fetch message history when the component mounts
    fetchMessageHistory();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        content: newMessage,
        sender: "",
        timestamp: new Date().toLocaleTimeString(),
      };

      // Simulate sending the new message to the backend
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessageObj),
        });

        if (response.ok) {
          setMessages([...messages, newMessageObj]);
          setNewMessage('');
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <span className="timestamp">{message.timestamp}</span>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;
