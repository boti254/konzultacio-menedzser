import BackButton from "../../components/BackButton/BackButton";
import "./UsersPage.css";

function UsersPage() {
  const data = ["Peter", "Janos Janos"];
  return (
    <div className="users-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="users-input-wrapper">
        <input type="text" id="searchUser" placeholder="Ide irj nevet" />
        <button className="search-button">Keresés</button>
      </div>
      {data.map((user) => (
        <div className="user-container" key={user}>
          <button className="icon-container">I</button>
          <div className="name-container">{user}</div>
          <button className="icon-container">M</button>
        </div>
      ))}
    </div>
  );
}

export default UsersPage;
