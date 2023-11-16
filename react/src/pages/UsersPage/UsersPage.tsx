import BackButton from "../../components/BackButton/BackButton";
import "./UsersPage.css";

function UsersPage() {
  const data = ["Peter", "Janos Janos"];
  return (
    <div className="users-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="users-input-wrapper">
        <label htmlFor="searchUser" className="km-label">
          Név
        </label>
        <input
          type="text"
          id="searchUser"
          className="km-input"
          placeholder="Ide irj nevet"
        />
        <button className="search-button km-button">Keresés</button>
      </div>
      {data.map((user) => (
        <div className="user-container" key={user}>
          <div className="icon-container">ICON</div>
          <div className="name-container">{user}</div>
          <button className="icon-container km-icon-button-primary">M</button>
        </div>
      ))}
    </div>
  );
}

export default UsersPage;
