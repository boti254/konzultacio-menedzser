import BackButton from "../../components/BackButton/BackButton";
import "./AppointmentListPage.css";

function AppointmentListPage() {
  const data = ["2023.10.10. 10:10", "2023.10.10. 11:11", "2023.10.10. 12:12"];
  return (
    <div className="appointment-listpage-container">
      <BackButton linkTo={"/menu"} />
      <div className="appointment-page-header">
        <div className="header-title">
          <h1>Konzultáció jelentkezés</h1>
        </div>
        <div className="appointment-select-container">
          <select name="appointmentSelect" id="appointmentSelect">
            <option value="ABC123">Pelda Bela</option>
            <option value="XYZ987">Janos Fanos</option>
          </select>
        </div>
      </div>
      {data.map((appointment) => (
        <div className="appointment-container" key={appointment}>
          <div className="date-container">{appointment}</div>
          <button className="icon-container km-icon-button-primary">+</button>
        </div>
      ))}
    </div>
  );
}

export default AppointmentListPage;
