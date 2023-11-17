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
      <button className="menu-button" onClick={handleTodoStudentClick}>
        TODO-Student
      </button>
      <button className="menu-button" onClick={handleTodoTeacherClick}>
        TODO-Teacher
      </button>
      <button className="menu-button" onClick={handleChatContactsClick}>
        ChatContacts
      </button>
      <button className="menu-button" onClick={handleChatClick}>
        Chat
      </button>
      <button className="menu-button" onClick={handleFhClick}>
        Felhasználók
      </button>
      <button className="menu-button" onClick={handleSaClick}>
        Saját adatok
      </button>
      <button className="menu-button" onClick={handleIszClick}>
        Időpont szerkesztése
      </button>
      <button className="menu-button" onClick={handleIjClick}>
        Időpontra jelentkezés
      </button>
      <button
        className="menu-button"
        onClick={handleAppointmentStudentEditClick}
      >
        AppointmentStudentEdit
      </button>
      <button
        className="menu-button"
        onClick={handleAppointmentTeacherEditClick}
      >
        AppointmentTeacherEdit
      </button>
      <button className="menu-button" onClick={handleListStudentClick}>
        ListStudent
      </button>
      <button className="menu-button" onClick={handleListTeacherClick}>
        ListTeacher
      </button>
      <button className="menu-logout-button" onClick={handleLogoutClick}>
        Kijelentkezés
      </button>
    </div>
  );
}

export default MenuPage;
