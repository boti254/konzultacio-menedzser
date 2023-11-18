import BackButton from "../../components/BackButton/BackButton";
import "./AppointmentEditListPage.css";

function AppointmentEditListPage() {
  const data = ["2023.10.10. 10:10", "2023.10.10. 11:11", "2023.10.10. 12:12"];
  return (
    <div className="appointment-listpage-container">
      <BackButton linkTo={"/menu"} />
      <div className="appointment-page-header">
        <div className="header-title">
          <h1>Konzultáció időpontok</h1>
        </div>
      </div>
      {data.map((appointment) => (
        <div className="appointment-container" key={appointment}>
          <div className="date-container">{appointment}</div>
          <button className="icon-container km-icon-button-primary">M</button>
        </div>
      ))}
      <div className="appointment-page-button">
        <button className="icon-container km-icon-button-primary">+</button>
      </div>
    </div>
  );
}

export default AppointmentEditListPage;
