import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import "./UserEditPage.css";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/Interfaces";

function UserEditPage() {
  const { id } = useParams();
  const { fetchUser, user, updateUser, createUser } = useUser();

  const [checkedState, setCheckedState] = useState<User>({
    id: NaN,
    name: "",
    email: "",
    password: "",
    neptun: "",
    email_verified_at: "",
    created_at: "",
    updated_at: "",
    student: NaN,
    teacher: NaN,
    admin: NaN,
  });

  const handleCheckboxChange = (checkboxId: keyof User) => {
    setCheckedState((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedState({
      ...checkedState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    if (id !== "0") {
      updateUser(
        checkedState.name,
        checkedState.email,
        checkedState.password,
        checkedState.neptun,
        checkedState.student,
        checkedState.teacher,
        checkedState.admin,
        `https://szoftarch.webgravir.hu/api/users/store/${user?.id}`
      );
    } else {
      createUser(
        checkedState.name,
        checkedState.email,
        checkedState.password,
        checkedState.neptun,
        Boolean(checkedState.student),
        Boolean(checkedState.teacher),
        Boolean(checkedState.admin),
        `https://szoftarch.webgravir.hu/api/users/store/0`,
        true
      );
    }
  };

  useEffect(() => {
    if (id !== "0") {
      fetchUser(`https://szoftarch.webgravir.hu/api/users/get/${id}`);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setCheckedState(user);
    }
  }, [user]);

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
          name="name"
          placeholder="Nev"
          value={checkedState?.name}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      <div className="user-input-wrapper">
        <label htmlFor="userEmail" className="km-label">
          Email
        </label>
        <input
          type="email"
          id="userEmail"
          name="email"
          className="km-input"
          placeholder="Email"
          value={checkedState?.email}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      <div className="user-input-wrapper">
        <label htmlFor="userPass" className="km-label">
          Jelszó
        </label>
        <input
          type="password"
          id="userPass"
          name="password"
          className="km-input"
          placeholder="Password"
          value={checkedState?.password}
          onChange={handleChange}
          autoComplete="off"
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
          value={checkedState?.neptun}
          name="neptun"
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      <div className="user-input-wrapper">
        <label className="km-label">Jogosultság</label>
        <div className="user-role-container">
          <label htmlFor="studentCheck">
            <input
              type="checkbox"
              id="studentCheck"
              name="studentCheck"
              checked={Boolean(checkedState.student)}
              onChange={() => handleCheckboxChange("student")}
            />
            <div className="user-role">Hallgató </div>
          </label>
          <label htmlFor="teacherCheck">
            <input
              type="checkbox"
              id="teacherCheck"
              name="teacherCheck"
              checked={Boolean(checkedState.teacher)}
              onChange={() => handleCheckboxChange("teacher")}
            />
            <div className="user-role">Konzulens </div>
          </label>
          <label htmlFor="adminCheck">
            <input
              type="checkbox"
              id="adminCheck"
              name="adminCheck"
              checked={Boolean(checkedState.admin)}
              onChange={() => handleCheckboxChange("admin")}
            />
            <div className="user-role">Admin </div>
          </label>
        </div>
      </div>
      <button className="save-btn km-button" onClick={handleSave}>
        Mentés
      </button>
    </div>
  );
}

export default UserEditPage;
