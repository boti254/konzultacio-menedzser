import "./TodoStudentPage.css";
import { TodoTask } from "../../interfaces/Interfaces";
import BackButton from "../../components/BackButton/BackButton";

function TodoStudentPage() {
  const fakeFeladatok = [
    { name: "Elso", due: "Valami" },
    { name: "Masodik", due: "asd" },
    { name: "Harmadik", due: "asd" },
  ];
  return (
    <div className="todo-student-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="todo-student-page-header">
        <div className="header-title">
          <h1>TODO</h1>
        </div>
      </div>
      <div className="todo-student-page-body">
        {fakeFeladatok.map((feladat: TodoTask) => (
          <div className="task-container">
            <div className="task-half">{feladat.name}</div>
            <div className="task-half">{feladat.due}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoStudentPage;
