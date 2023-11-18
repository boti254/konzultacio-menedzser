import { useEffect, useState } from "react";
import "./ListTeacherPage.css";
import BackButton from "../../components/BackButton/BackButton";
import { usePairs } from "../../hooks/usePairs";

// const mockStudents = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
//   { id: 3, name: "Bob Johnson" },
// ];

function ListTeacherPage() {
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const [filteredStudents, setFilteredStudents] = useState(mockStudents);

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const term = e.target.value.toLowerCase();
  //   setSearchTerm(term);

  //   const filtered = mockStudents.filter((student) =>
  //     student.name.toLowerCase().includes(term)
  //   );
  //   setFilteredStudents(filtered);
  // };

  const { data, loading, fetchStudents } = usePairs();

  useEffect(() => {
    fetchStudents("https://szoftarch.webgravir.hu/api/pairs/my-students");
  }, []);

  return (
    <div className="student-search-container">
      <BackButton linkTo={"/menu"} />
      <label className="km-label">Hallgatók listája</label>
      <div className="default-margin">
        <input
          type="text"
          placeholder="Hallgató keresése"
          // value={searchTerm}
          // onChange={handleSearch}
          className="km-input"
        />
      </div>
      <div className="student-list">
        <h2>Hallgatók</h2>
        <ul>
          {loading
            ? "Betöltés..."
            : data?.map((student) => (
                <li key={student.user.id}>
                  <span>{student.user.name}</span>
                  <button className="km-icon-button-primary">+</button>
                  <button className="km-icon-button-error">-</button>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default ListTeacherPage;
