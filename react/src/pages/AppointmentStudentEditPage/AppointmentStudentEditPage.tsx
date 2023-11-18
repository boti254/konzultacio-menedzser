import BackButton from "../../components/BackButton/BackButton";
import "./AppointmentStudentEditPage.css";

function AppointmentStudentEditPage() {
  const data = ["Pelda Bela", "Janos Fanos"];
  return (
    <div className="appointment-student-edit-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="appointment-page-header">
        <div className="header-title">
          <h1>Konzultáció jelentkezés</h1>
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
          Szabad helyek
        </label>
        <div className="appointment-participant-container">
          <label htmlFor="appointmentParticipant" className="km-label">
            1
          </label>
        </div>
      </div>
      {data.map((participant) => (
        <div className="appointment-participant-list-container" key={participant}>
          <div className="date-container">{participant}</div>
        </div>
      ))}
      <button className="apply-btn km-button">Jelentkezem</button>
    </div>
  );
}

export default AppointmentStudentEditPage;

