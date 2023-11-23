import { useEffect, useState } from "react";
import "./ListTeacherPage.css";
import BackButton from "../../components/BackButton/BackButton";
import { usePairs } from "../../hooks/usePairs";
import { useUsers } from "../../hooks/useUsers";
import { User } from "../../interfaces/Interfaces";
import PlusIcon from "../../assets/plus.svg";

function ListTeacherPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredConsultants, setFilteredConsultants] = useState<User[]>();

  const { applyToTeacher } = usePairs();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data?.filter((user) =>
      user.name.toLowerCase().includes(term)
    );
    setFilteredConsultants(filtered);
  };
  const handleApply = (id: number) => {
    applyToTeacher(
      `https://szoftarch.webgravir.hu/api/pairs/apply-to-teacher/${id}`
    );
  };

  const { data, loading, fetchUsers } = useUsers();

  useEffect(() => {
    setFilteredConsultants(data);
  }, [data]);

  useEffect(() => {
    fetchUsers("https://szoftarch.webgravir.hu/api/users/teachers");
  }, []);

  return (
    <div className="consultant-search-container">
      <BackButton linkTo={"/menu"} />
      <label className="km-label default-margin">Konzulensek listája</label>
      <div className="default-margin">
        <input
          type="text"
          className="km-input"
          placeholder="Konzulens keresése"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="consultant-list">
        <h2>Konzulensek</h2>
        <ul className="list-teacher-wrapper">
          {loading
            ? "Betöltés..."
            : filteredConsultants?.map((consultant) => (
                <li key={consultant.id} className="list-teacher-container">
                  <span className="list-teacher-name">
                    {consultant.name} - {consultant.neptun}
                  </span>
                  <button
                    className="km-icon-button-primary icon-container list-teacher-btn"
                    onClick={() => handleApply(consultant.id)}
                  >
                    <img src={PlusIcon} alt="" />
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default ListTeacherPage;
