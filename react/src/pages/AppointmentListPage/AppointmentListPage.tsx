import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import "./AppointmentListPage.css";
import { UserPair } from "../../interfaces/Interfaces";
import { useMeetings } from "../../hooks/useMeetings";
import { usePairs } from "../../hooks/usePairs";

function AppointmentListPage() {
  const [selectedTeacherId, setSelectedTeacher] = useState("");
  const { data, loading, fetchStudents } = usePairs();
  const {
    data: meetings,
    loading: meetingsLoading,
    fetchMeetings,
    setData: setMeetings,
  } = useMeetings();
  useEffect(() => {
    fetchStudents("https://szoftarch.webgravir.hu/api/pairs/my-teachers");
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeacher(event.target.value);
    if (event.target.value !== "Diák" && event.target.value !== "") {
      fetchMeetings(
        `https://szoftarch.webgravir.hu/api/meetings/of-teacher/${event.target.value}/0`
      );
    }
    if (event.target.value !== "Diák") {
      setMeetings([]);
    }
  };

  return (
    <div className="appointment-listpage-container">
      <BackButton linkTo={"/menu"} />
      <div className="appointment-page-header">
        <div className="header-title">
          <h1>Konzultáció jelentkezés</h1>
        </div>
        <div className="appointment-select-container">
          <select
            name="appointmentSelect"
            id="appointmentSelect"
            className="km-select"
            value={selectedTeacherId}
            onChange={handleSelect}
          >
            <option value="">Konzulens</option>
            {loading ? (
              <option>Betöltés...</option>
            ) : (
              data?.map((teacher: UserPair) => (
                <option key={teacher.pair.id} value={teacher.user.id}>
                  {teacher.user.name} - {teacher.user.neptun}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
      {meetingsLoading ? (
        <div>Betöltés...</div>
      ) : (
        meetings?.map((meeting) => (
          <div className="appointment-container" key={meeting.id}>
            <div className="date-container">{meeting.date}</div>
            <a
              className="icon-container km-icon-button-primary"
              href={`/appointment-student-edit/${meeting.id}`}
            >
              +
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default AppointmentListPage;
