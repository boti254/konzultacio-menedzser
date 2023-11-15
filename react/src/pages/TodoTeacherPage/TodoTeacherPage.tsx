import "./TodoTeacherPage.css";
import BackButton from "../../components/BackButton/BackButton";
import { TodoTask } from "../../interfaces/Interfaces";

function TodoTeacherPage() {
  const data = [
    {
      id: 1,
      student_id: 11,
      title: "feladat",
      due: "due",
      done: true,
      created_at: "created",
      updated_at: "updatedat",
    },
    {
      id: 2,
      student_id: 11,
      title: "feladat2",
      due: "due",
      done: false,
      created_at: "created",
      updated_at: "updatedat",
    },
  ];
  return (
    <div className="todo-student-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="todo-teacher-page-header">
        <div className="header-title">
          <h1>TODO</h1>
        </div>
        <div className="todo-teacher-select-container">
          <select name="studentSelect" id="studentSelect">
            <option value="ABC123">Pelda Bela</option>
            <option value="XYZ987">Janos Fanos</option>
          </select>
        </div>
      </div>
      <div className="todo-student-page-body">
        {data?.map((feladat: TodoTask) => (
          <div className="task-container" key={feladat.id}>
            <div className="task-name">{feladat.title}</div>
            <div className="task-due">{feladat.due}</div>
            <button className="task-edit">M</button>
            <button className="task-done">K</button>
            <button className="task-delete">T</button>
          </div>
        ))}
      </div>
      <div className="todo-input-container">
        <div className="todo-input-wrapper">
          <label htmlFor="taskName">Feladat Neve</label>
          <input type="text" id="taskName" placeholder="Feladat Neve" />
        </div>
        <div className="todo-input-wrapper">
          <label htmlFor="taskDue">Elkészítési Határidő</label>
          <input type="date" id="taskDue" placeholder="Elkeszitesi Hatarido" />
        </div>

        <button>Felvétel</button>
      </div>
    </div>
  );
}

export default TodoTeacherPage;
