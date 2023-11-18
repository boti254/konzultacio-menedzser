import { useState } from "react";
import { Link } from 'react-router-dom';
import './ChatContactPage.css';
import BackButton from "../../components/BackButton/BackButton";

const mockContacts = [
  { id: 1, name: 'Alice', userType: 'student' },
  { id: 2, name: 'Bob', userType: 'consultant' },
  // Add more contacts as needed
];

function ChatContactsPage() {
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
  };

  return (
    <div className="chat-contact-container">
      <BackButton linkTo={"/menu"} />
      <h2>Kontaktok</h2>
      <ul className="contact-list">
        {mockContacts.map((contact) => (
          <li key={contact.id} onClick={() => handleContactSelect(contact)}>
            {contact.name} ({contact.userType})
          </li>
        ))}
      </ul>
      {selectedContact && (
        <Link to={`/chat/${selectedContact.id}`} className="km-button">
          Chat indítása vele: {selectedContact.name}
        </Link>
      )}
    </div>
  );
}

export default ChatContactsPage;
