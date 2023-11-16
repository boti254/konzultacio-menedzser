import { useState } from "react";
import "./TodoTeacherPage.css"
import { Link } from "react-router-dom";

const mockStudentData = [
  { id: 1, name: 'Alice', todos: ['Task 1', 'Task 2'] },
  { id: 2, name: 'Bob', todos: ['Task 3', 'Task 4'] },
];

function TodoTeacherPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [newTask, setNewTask] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Simulate fetching student data from the backend
    const student = mockStudentData.find(student =>
      student.name.toLowerCase().includes(term)
    );

    setSelectedStudent(student || null);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTodos = selectedStudent.todos.concat(newTask);
      const updatedStudent = { ...selectedStudent, todos: updatedTodos };
      // Update the student data (this would be done through a backend API in a real application)
      // For now, we're just updating the state locally
      const updatedStudentData = mockStudentData.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student
      );
      setSelectedStudent(updatedStudent);
      setNewTask('');
    }
  };

  return (
    <div className="consultant-todo-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a student by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {selectedStudent && (
        <div className="todo-list">
          <h2>{selectedStudent.name}'s TODOs</h2>
          <ul>
            {selectedStudent.todos.map((task: string, index: number) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
          <div className="add-task">
            <input
              type="text"
              placeholder="Enter a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Felvétel</button>
          </div>
        </div>
      )}
      <Link to="/students" className="students-button">
        Hallgatók
      </Link>
    </div>
  );
}

export default TodoTeacherPage;
