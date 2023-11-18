import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import "./UserEditPage.css";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/Interfaces";
function UserEditPage() {
  const { id } = useParams();
  const [userState, setUserState] = useState<User>();
  const { fetchUser, user } = useUser();

  useEffect(() => {
    fetchUser(`https://szoftarch.webgravir.hu/api/users/get/${id}`);
  }, []);

  useEffect(() => {
    setUserState(user);
  }, [user]);

  // const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserState();
  // };

  // const handleNeptunChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserState(event.target.value);
  // };

  // const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserState(event.target.value);
  // };

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
          value={userState?.name}
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
          value={userState?.email}
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
          value={userState?.neptun}
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
