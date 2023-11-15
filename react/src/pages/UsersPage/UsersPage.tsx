import "./UsersPage.css";

function UsersPage() {
  const data = ["Peter", "Janos Janos"];
  return (
    <div className="users-page-container">
      <div className="users-input-wrapper">
        <input type="text" id="searchUser" placeholder="Ide irj nevet" />
        <button className="search-button">Keresés</button>
      </div>
      {data.map((user) => (
        <div className="user-container" key={user}>
          <div className="icon-container">I</div>
          <div className="name-container">{user}</div>
          <div className="icon-container">M</div>
        </div>
      ))}
    </div>
  );
}

export default UsersPage;
