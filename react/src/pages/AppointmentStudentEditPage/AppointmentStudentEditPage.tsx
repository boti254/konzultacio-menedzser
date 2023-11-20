import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import "./AppointmentStudentEditPage.css";
import { useMeeting } from "../../hooks/useMeeting";
import { useEffect, useState } from "react";

function AppointmentStudentEditPage() {
  const data2 = ["NOTREALPelda Bela", "NOTREALPeldaJanos Fanos"];
  const { data, loading, fetchMeetingById, applyToMeeting } = useMeeting();
  const { id } = useParams();

  const [inputDate, setInputDate] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };
  const [inputPlace, setInputPlace] = useState("");
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlace(e.target.value);
  };

  useEffect(() => {
    const tempDate = data === undefined ? "" : data.date;
    const tempPlace = data === undefined ? "" : data.location;
    setInputDate(tempDate);
    setInputPlace(tempPlace);
  }, [data]);

  useEffect(() => {
    fetchMeetingById(
      `https://szoftarch.webgravir.hu/api/meetings/meeting/${id}`
    );
  }, []);
  const handleApply = () => {
    applyToMeeting(
      `https://szoftarch.webgravir.hu/api/applications/apply-to/${id}`
    );
  };
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
            {data?.count}
          </label>
        </div>
      </div>
      {loading ? (
        <div>Betöltés...</div>
      ) : (
        data2?.map((participant) => (
          <div
            className="appointment-participant-list-container"
            key={participant}
          >
            <div className="date-container">{participant}</div>
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
