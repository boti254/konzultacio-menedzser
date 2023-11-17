import BackButton from "../../components/BackButton/BackButton";
import "./UserEditPage.css";
function UserEditPage() {
  return (
    <div className="user-edit-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="user-input-wrapper">
        <label htmlFor="userName" className="km-label">
          Név
        </label>
        <input
          type="text"
          id="userName"
          className="km-input"
          placeholder="Nev"
        />
      </div>
      <div className="user-input-wrapper">
        <label htmlFor="userEmail" className="km-label">
          Email
        </label>
        <input
          type="email"
          id="userEmail"
          className="km-input"
          placeholder="Email"
        />
      </div>
      <div className="user-input-wrapper">
        <label htmlFor="userNeptun" className="km-label">
          Neptun
        </label>
        <input
          type="text"
          id="userNeptun"
          className="km-input"
          placeholder="Neptun"
        />
      </div>
      <div className="user-input-wrapper">
        <label className="km-label">Jogosultság</label>
        <div className="user-role-container">
          <button className="user-role">Hallgató</button>
          <button className="user-role">Konzulens</button>
          <button className="user-role">Admin</button>
        </div>
      </div>
      <button className="save-btn">Mentés</button>
    </div>
  );
}

export default UserEditPage;
