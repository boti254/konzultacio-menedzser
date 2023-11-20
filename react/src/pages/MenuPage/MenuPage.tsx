import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import "./MenuPage.css";
//import { useParams } from "react-router-dom";

function MenuPage() {
  //const { name } = useParams();
  const { fetchUser, user } = useUser();

  useEffect(() => {
    fetchUser(`https://szoftarch.webgravir.hu/api/users/me`);
  }, []);
  return (
    <div className="menu-container">
      <label className="km-label">{user?.name}</label>
      {user?.student ? (
        <a className="km-button" href="/todo-student">
          Feladatok
        </a>
      ) : (
        ""
      )}
      {user?.teacher ? (
        <a className="km-button" href="/todo-teacher">
          Feladatok kiosztása
        </a>
      ) : (
        ""
      )}
      <a className="km-button" href="/chat-contacts">
        Chat Kontaktok
      </a>
      {user?.admin ? (
        <a className="km-button" href="/users">
          Felhasználók
        </a>
      ) : (
        ""
      )}
      {user?.teacher ? (
        <a className="km-button" href="/appointment-edit-list">
          Időpont szerkesztése
        </a>
      ) : (
        ""
      )}
      {user?.student ? (
        <a className="km-button" href="/appointment-list">
          Időpontra jelentkezés
        </a>
      ) : (
        ""
      )}
      {user?.teacher ? (
        <a className="km-button" href="/list-student">
          Hallgató lista
        </a>
      ) : (
        ""
      )}
      {user?.student ? (
        <a className="km-button" href="/list-teacher">
          Konzulens lista
        </a>
      ) : (
        ""
      )}
      <a className="km-button-error" href="/">
        Kijelentkezés
      </a>
    </div>
  );
}

export default MenuPage;
