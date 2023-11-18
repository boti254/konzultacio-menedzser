import "./MenuPage.css";
import { useParams } from "react-router-dom";

function MenuPage() {
  const { name } = useParams();
  return (
    <div className="menu-container">

      {name ? <label className="km-label">{name}</label> : ""}
      <a className="km-button" href="/todo-student">
        TODO-Hallgató
      </a>
      <a className="km-button" href="/todo-teacher">
        TODO-Konzulens
      </a>
      <a className="km-button" href="/chat-contacts">
        Chat Kontaktok
      </a>
      <a className="km-button" href="users">
        Felhasználók
      </a>
      <a className="km-button" href="/appointment-edit-list">
        Időpont szerkesztése
      </a>
      <a className="km-button" href="/appointment-list">
        Időpontra jelentkezés
      </a>
      <a className="km-button" href="/appointment-student-edit">
        Konzultációs időpont szerkesztése-Hallgató
      </a>
      <a className="km-button" href="/appointment-teacher-edit">
        Konzultációs időpont szerkesztése-Konzulens
      </a>
      <a className="km-button" href="/list-student">
        Hallgató lista
      </a>
      <a className="km-button" href="/list-teacher">
        Konzulens lista
      </a>
      <a className="km-button-error" href="/">
        Kijelentkezés
      </a>
    </div>
  );
}

export default MenuPage;
