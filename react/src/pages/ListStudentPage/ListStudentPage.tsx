import { useState } from "react";
import "./ListStudentPage.css";
import BackButton from "../../components/BackButton/BackButton";

const mockConsultants = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
];

function ListStudentPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredConsultants, setFilteredConsultants] =
    useState(mockConsultants);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = mockConsultants.filter((consultant) =>
      consultant.name.toLowerCase().includes(term)
    );
    setFilteredConsultants(filtered);
  };

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
        <ul>
          {filteredConsultants.map((consultant) => (
            <li key={consultant.id}>
              <span>{consultant.name}</span>
              <button className="km-icon-button-primary">J</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListStudentPage;
