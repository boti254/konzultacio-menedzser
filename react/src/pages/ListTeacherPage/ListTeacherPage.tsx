import { useState } from "react";
import "./ListTeacherPage.css"

const mockStudents = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' },
];

function ListTeacherPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = mockStudents.filter(student =>
      student.name.toLowerCase().includes(term)
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className="student-search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search students by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="student-list">
        <h2>Students</h2>
        <ul>
          {filteredStudents.map(student => (
            <li key={student.id}>{student.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListTeacherPage;
