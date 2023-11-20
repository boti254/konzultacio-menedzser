import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import { useMeeting } from "../../hooks/useMeeting";
import "./AppointmentTeachertEditPage.css";
import { useEffect, useState } from "react";

function AppointmentTeachertEditPage() {
  const data2 = ["NOTREALPelda Bela", "NOTREALPeldaJanos Fanos"];

  const { data, loading, fetchMeetingById, updateMeeting } = useMeeting();
  const { id } = useParams();

  const [inputDate, setInputDate] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };
  const [inputPlace, setInputPlace] = useState("");
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlace(e.target.value);
  };
  const [count, setCount] = useState(0);
  const handleCountChange = (plusminus: string) => {
    if (plusminus === "plus") {
      const temp = count + 1;
      setCount(temp);
    } else {
      const temp2 = count - 1;
      setCount(temp2);
    }
  };

  const handleUpdate = (date: string, location: string, count: number) => {
    updateMeeting(
      `https://szoftarch.webgravir.hu/api/meetings/store/${id}`,
      date,
      location,
      count
    );
  };

  useEffect(() => {
    const tempDate = data === undefined ? "" : data.date;
    const tempPlace = data === undefined ? "" : data.location;
    const tempCount = data === undefined ? "" : data.count;
    setCount(Number(tempCount));
    setInputDate(tempDate);
    setInputPlace(tempPlace);
  }, [data]);

  useEffect(() => {
    fetchMeetingById(
      `https://szoftarch.webgravir.hu/api/meetings/meeting/${id}`
    );
  }, []);

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
          onChange={handlePlaceChange}
          value={loading ? "" : inputPlace.split(" ")[0]}
        />
      </div>
      <div className="appointment-input-wrapper">
        <label htmlFor="appointmentParticipant" className="km-label">
          Létszám
        </label>
        <div className="appointment-participant-container">
          <button
            className="icon-container km-icon-button-primary"
            onClick={() => handleCountChange("minnus")}
          >
            -
          </button>
          <label htmlFor="appointmentParticipant" className="km-label-greener">
            {count}
          </label>
          <button
            className="icon-container km-icon-button-primary"
            onClick={() => handleCountChange("plus")}
          >
            +
          </button>
        </div>
      </div>
      {data2.map((participant) => (
        <div
          className="appointment-participant-list-container"
          key={participant}
        >
          <div className="date-container">{participant}</div>
          <div className="buttonlist">
            <button className="icon-container km-icon-button-primary">-</button>
            <button className="icon-container km-icon-button-primary">+</button>
          </div>
        </div>
      ))}
      <button
        className="save-btn km-button"
        onClick={() => handleUpdate(inputDate, inputPlace, count)}
      >
        Mentés
      </button>
    </div>
  );
}

export default AppointmentTeachertEditPage;
