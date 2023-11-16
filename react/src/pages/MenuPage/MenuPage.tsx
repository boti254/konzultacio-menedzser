import "./MenuPage.css"

function MenuPage() {
  return (
    <div className="menu-container">
      <button className="menu-button">TODO</button>
      <button className="menu-button">Chat</button>
      <button className="menu-button">Felhasználók</button>
      <button className="menu-button">Saját adatok</button>
      <button className="menu-button">Időpont szerkesztése</button>
      <button className="menu-button">Időpontra jelentkezés</button>
      <button className="menu-logout-button">Kijelentkezés</button>
    </div>
  );
}

export default MenuPage;