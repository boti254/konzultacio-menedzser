import BackButton from "../../components/BackButton/BackButton";
import "./AppointmentTeachertEditPage.css";

function AppointmentTeachertEditPage() {
  return (
    <div className="appointment-teacher-edit-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="appointment-page-header">
        <div className="header-title">
          <h1>Konzultáció létrehozás</h1>
        </div>
      </div>
      <div className="appointment-input-wrapper">
        <label htmlFor="appointmentDate" className="km-label">
          Időpont
        </label>
        <input
          type="date"
          id="appointmentDate"
          className="km-input"
        />
      </div>
      <div className="appointment-input-wrapper">
        <label htmlFor="appointmentPlace" className="km-label">
          Helyszín
        </label>
        <input
          type="text"
          id="appointmentPlace"
          className="km-input"
          placeholder="Helyszín"
        />
      </div>
      <div className="appointment-input-wrapper">
        <label htmlFor="appointmentParticipant" className="km-label">
          Létszám
        </label>
        <div className="appointment-participant-container">
          <button className="icon-container km-icon-button-primary">-</button>
          <label htmlFor="appointmentParticipant" className="km-label">
            3
          </label>
          <button className="icon-container km-icon-button-primary">+</button>
        </div>
      </div>
      <button className="save-btn">Mentés</button>
    </div>
  );
}

export default AppointmentTeachertEditPage;
