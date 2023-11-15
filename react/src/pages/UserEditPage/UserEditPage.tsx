import BackButton from "../../components/BackButton/BackButton";
import "./UserEditPage.css";
function UserEditPage() {
  return (
    <div className="user-edit-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="user-input-wrapper">
        <label htmlFor="userName">Név</label>
        <input type="text" id="userName" placeholder="Nev" />
      </div>
      <div className="user-input-wrapper">
        <label htmlFor="userEmail">Email</label>
        <input type="email" id="userEmail" placeholder="Email" />
      </div>
      <div className="user-input-wrapper">
        <label htmlFor="userNeptun">Neptun</label>
        <input type="text" id="userNeptun" placeholder="Neptun" />
      </div>
      <div className="user-input-wrapper">
        <label>Jogosultság</label>
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
