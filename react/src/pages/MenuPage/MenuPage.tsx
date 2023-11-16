import "./MenuPage.css"
import { useNavigate } from 'react-router-dom';

function MenuPage() {
  const navigate = useNavigate();

  const handleTodoClick = () => {
    //TODO
    /* Későbbre
    if (userType == "student") {
      navigate('/todo-student');
    }
    else {
      navigate('/todo-teacher');
    }
    */
   navigate('todo-student');
  }

  const handleChatClick = () => {
    navigate('chat-contacts');
  }

  const handleFhClick = () => {
    navigate('users');
  }

  const handleSaClick = () => {
    navigate('user-edit');
  }

  const handleIszClick = () => {
    navigate('appointment-edit-list');
  }

  const handleIjClick = () => {
    navigate('appointment-list');
  }

  const handleLogoutClick = () => {
    //TODO
    navigate('/');
  }

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={handleTodoClick}>TODO</button>
      <button className="menu-button" onClick={handleChatClick}>Chat</button>
      <button className="menu-button" onClick={handleFhClick}>Felhasználók</button>
      <button className="menu-button" onClick={handleSaClick}>Saját adatok</button>
      <button className="menu-button" onClick={handleIszClick}>Időpont szerkesztése</button>
      <button className="menu-button" onClick={handleIjClick}>Időpontra jelentkezés</button>
      <button className="menu-logout-button" onClick={handleLogoutClick}>Kijelentkezés</button>
    </div>
  );
}

export default MenuPage;