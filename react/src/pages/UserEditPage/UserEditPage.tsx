import { useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import "./UserEditPage.css";

interface CheckboxState {
  student: boolean;
  teacher: boolean;
  admin: boolean;
}

function UserEditPage() {
  const [checkedState, setCheckedState] = useState<CheckboxState>({
    student: false,
    teacher: false,
    admin: false,
  });

  const handleCheckboxChange = (checkboxId: keyof CheckboxState) => {
    setCheckedState((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxId]: !prevCheckboxes[checkboxId],
    }));
  };

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
          <label htmlFor="studentCheck">
            <input
              type="checkbox"
              id="studentCheck"
              name="studentCheck"
              checked={checkedState.student}
              onChange={() => handleCheckboxChange("student")}
            />
            <div className="user-role">Hallgató </div>
          </label>
          <label htmlFor="teacherCheck">
            <input
              type="checkbox"
              id="teacherCheck"
              name="teacherCheck"
              checked={checkedState.teacher}
              onChange={() => handleCheckboxChange("teacher")}
            />
            <div className="user-role">Konzulens </div>
          </label>
          <label htmlFor="adminCheck">
            <input
              type="checkbox"
              id="adminCheck"
              name="adminCheck"
              checked={checkedState.admin}
              onChange={() => handleCheckboxChange("admin")}
            />
            <div className="user-role">Admin </div>
          </label>
        </div>
      </div>
      <button className="save-btn km-button">Mentés</button>
    </div>
  );
}

export default UserEditPage;
