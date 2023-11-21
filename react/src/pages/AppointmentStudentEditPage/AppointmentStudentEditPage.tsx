import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import "./AppointmentStudentEditPage.css";
import { useMeeting } from "../../hooks/useMeeting";
import { useEffect, useState } from "react";
import { useApplications } from "../../hooks/useApplications";

function AppointmentStudentEditPage() {
  const { data, loading, fetchMeetingById, applyToMeeting } = useMeeting();
  const { id } = useParams();

  const {
    data: meetings,
    loading: meetingsloading,
    fetchMeetings,
  } = useApplications();

  const [inputDate, setInputDate] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };
  const [inputPlace, setInputPlace] = useState("");
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlace(e.target.value);
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    const tempDate = data === undefined ? "" : data.date;
    const tempPlace = data === undefined ? "" : data.location;
    const tempCount =
      data === undefined
        ? 0
        : data.count - (meetings === undefined ? 0 : meetings.length);
    setCount(tempCount);
    setInputDate(tempDate);
    setInputPlace(tempPlace);
  }, [data, meetings]);

  useEffect(() => {
    fetchMeetingById(
      `https://szoftarch.webgravir.hu/api/meetings/meeting/${id}`
    );
    fetchMeetings(
      `https://szoftarch.webgravir.hu/api/applications/meeting/${id}`
    );
  }, []);
  const handleApply = () => {
    applyToMeeting(
      `https://szoftarch.webgravir.hu/api/applications/apply-to/${id}`
    );
    fetchMeetings(
      `https://szoftarch.webgravir.hu/api/applications/meeting/${id}`
    );
  };
  return (
    <div className="appointment-student-edit-page-container">
      <BackButton linkTo={"/appointment-list"} />
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
          disabled={true}
          onChange={handleInputChange}
          value={loading ? "" : inputDate.split(" ")[0]}
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
          disabled={true}
          onChange={handlePlaceChange}
          value={loading ? "" : inputPlace.split(" ")[0]}
        />
      </div>
      <div className="appointment-input-wrapper">
        <label htmlFor="appointmentParticipant" className="km-label">
          Szabad helyek
        </label>
        <div className="appointment-participant-container">
          <label htmlFor="appointmentParticipant" className="km-label">
            {count}
          </label>
        </div>
      </div>
      {meetingsloading ? (
        <div>Betöltés...</div>
      ) : (
        meetings?.map((meeting) => (
          <div
            className="appointment-participant-list-container"
            key={meeting.username}
          >
            <div className="date-container">{meeting.username}</div>
          </div>
        ))
      )}
      <button className="apply-btn km-button" onClick={handleApply}>
        Jelentkezem
      </button>
    </div>
  );
}

export default AppointmentStudentEditPage;
