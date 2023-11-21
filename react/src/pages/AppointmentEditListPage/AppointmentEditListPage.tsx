import { useEffect } from "react";
import BackButton from "../../components/BackButton/BackButton";
import { useMeetings } from "../../hooks/useMeetings";
import "./AppointmentEditListPage.css";
import { prettifyDate } from "../../helpers/helper";

function AppointmentEditListPage() {
  const { data, loading, fetchMeetings } = useMeetings();

  useEffect(() => {
    fetchMeetings(
      `https://szoftarch.webgravir.hu/api/meetings/my-meetings/teacher/0`
    );
  }, []);

  return (
    <div className="appointment-listpage-container">
      <BackButton linkTo={"/menu"} />
      <div className="appointment-page-header">
        <div className="header-title">
          <h1>Konzultáció időpontok</h1>
        </div>
      </div>
      {loading ? (
        <div>Betöltés...</div>
      ) : (
        data?.map((appointment) => (
          <div className="appointment-container" key={appointment.id}>
            <div className="date-container">
              {prettifyDate(appointment.date)}
            </div>
            <a
              className="icon-container km-icon-button-primary"
              href={`/appointment-teacher-edit/${appointment.id}`}
            >
              M
            </a>
          </div>
        ))
      )}
      <div className="appointment-page-button">
        <a
          className="icon-container km-icon-button-primary"
          href={`/appointment-teacher-edit/0`}
        >
          +
        </a>
      </div>
    </div>
  );
}

export default AppointmentEditListPage;
