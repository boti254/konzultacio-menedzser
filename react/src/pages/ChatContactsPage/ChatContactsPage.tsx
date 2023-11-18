import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './ChatContactPage.css';
import BackButton from "../../components/BackButton/BackButton";
import { usePairs } from "../../hooks/usePairs";

function ChatContactsPage() {
  const { data, loading, fetchStudents } = usePairs();
  useEffect(() => {
    fetchStudents("https://szoftarch.webgravir.hu/api/pairs/my-pairs");
  }, []);

  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
  };

  return (
    <div className="chat-contact-container">
      <BackButton linkTo={"/menu"} />
      <h2>Kontaktok</h2>
      <ul className="contact-list">
        {loading
            ? "Betöltés..."
            : data?.map((contact) => (
              <li key={contact.user.id} onClick={() => handleContactSelect(contact)}>
                {contact.user.name} ({contact.user.neptun})
              </li>
          ))}
      </ul>
      {selectedContact && (
        <Link to={`/chat/${selectedContact.user.id}`} className="km-button">
          Chat indítása vele: {selectedContact.user.name} ({selectedContact.user.neptun})
        </Link>
      )}
    </div>
  );
}

export default ChatContactsPage;
