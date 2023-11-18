import "./MenuPage.css";
import { useNavigate } from "react-router-dom";

function MenuPage() {
  const navigate = useNavigate();

  const handleTodoStudentClick = () => {
    navigate("/todo-student");
  };

  const handleTodoTeacherClick = () => {
    navigate("/todo-teacher");
  };

  const handleChatContactsClick = () => {
    navigate("/chat-contacts");
  };

  const handleChatClick = () => {
    navigate("/chat");
  };

  const handleFhClick = () => {
    navigate("/users");
  };

  const handleSaClick = () => {
    navigate("/user-edit");
  };

  const handleIszClick = () => {
    navigate("/appointment-edit-list");
  };

  const handleIjClick = () => {
    navigate("/appointment-list");
  };

  const handleAppointmentStudentEditClick = () => {
    navigate("/appointment-student-edit");
  };

  const handleAppointmentTeacherEditClick = () => {
    navigate("/appointment-teacher-edit");
  };

  const handleListStudentClick = () => {
    navigate("/list-student");
  };

  const handleListTeacherClick = () => {
    navigate("/list-teacher");
  };

  const handleLogoutClick = () => {
    //TODO
    navigate("/");
  };

  return (
    <div className="menu-container">
      <button className="km-button" onClick={handleTodoStudentClick}>
        TODO-Hallgató
      </button>
      <button className="km-button" onClick={handleTodoTeacherClick}>
        TODO-Konzulens
      </button>
      <button className="km-button" onClick={handleChatContactsClick}>
        Chat Kontaktok
      </button>
      <button className="km-button" onClick={handleChatClick}>
        Chat
      </button>
      <button className="km-button" onClick={handleFhClick}>
        Felhasználók
      </button>
      <button className="km-button" onClick={handleSaClick}>
        Saját adatok
      </button>
      <button className="km-button" onClick={handleIszClick}>
        Időpont szerkesztése
      </button>
      <button className="km-button" onClick={handleIjClick}>
        Időpontra jelentkezés
      </button>
      <button
        className="km-button"
        onClick={handleAppointmentStudentEditClick}
      >
        Konzultációs időpont szerkesztése-Hallgató
      </button>
      <button
        className="km-button"
        onClick={handleAppointmentTeacherEditClick}
      >
        Konzultációs időpont szerkesztése-Konzulens
      </button>
      <button className="km-button" onClick={handleListStudentClick}>
        Hallgató lista
      </button>
      <button className="km-button" onClick={handleListTeacherClick}>
        Konzulens lista
      </button>
      <button className="km-button-error" onClick={handleLogoutClick}>
        Kijelentkezés
      </button>
    </div>
  );
}

export default MenuPage;
