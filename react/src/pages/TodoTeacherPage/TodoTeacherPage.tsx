import "./TodoTeacherPage.css";
import BackButton from "../../components/BackButton/BackButton";
import { TodoTask } from "../../interfaces/Interfaces";
import { useEffect, useState } from "react";
import { useTodos } from "../../hooks/useTodos";

function TodoTeacherPage() {
  const { data, loading, fetchData, deleteTodo, updateTodo, createTodo } =
    useTodos();

  const handleDelete = (id: number) => {
    deleteTodo(`https://szoftarch.webgravir.hu/api/todos/delete/${id}`, id);
  };

  const handleUpdate = (
    id: number,
    done: number,
    title: string,
    due: string
  ) => {
    updateTodo(
      `https://szoftarch.webgravir.hu/api/todos/store/${id}`,
      done,
      title,
      due
    );
  };

  const handleCreate = (done: number, title: string, due: string) => {
    createTodo(
      `https://szoftarch.webgravir.hu/api/todos/store/0`,
      done,
      title,
      due
    );
  };

  useEffect(() => {
    fetchData("https://szoftarch.webgravir.hu/api/todos");
  }, []);

  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(event.target.value);
  };

  const newStyle = {
    color: "var(--success-color)",
  };
  return (
    <div className="todo-student-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="todo-teacher-page-header">
        <div className="header-title">
          <h1>TODO</h1>
        </div>
        <div className="todo-teacher-select-container">
          <label htmlFor="taskName" className="km-label">
            Válassz diákot
          </label>
          <select name="studentSelect" id="studentSelect" className="km-select">
            <option value="ABC123">Pelda Bela</option>
            <option value="XYZ987">Janos Fanos</option>
          </select>
        </div>
      </div>
      <div className="todo-student-page-body">
        {loading ? (
          <div>Betöltés...</div>
        ) : (
          data?.map((feladat: TodoTask) => (
            <div
              className="task-container"
              style={feladat.done ? newStyle : {}}
              key={feladat.id}
            >
              <div className="task-name">{feladat.title}</div>
              <div className="task-due">{feladat.due}</div>
              <button
                className="task-edit km-icon-button-primary"
                onClick={() => {
                  handleUpdate(
                    feladat.id,
                    Number(feladat.done),
                    taskName,
                    dueDate
                  );
                }}
              >
                M
              </button>
              <button
                className="task-done km-icon-button-success"
                onClick={() => {
                  handleUpdate(
                    feladat.id,
                    Number(!feladat.done),
                    feladat.title,
                    feladat.due
                  );
                }}
              >
                K
              </button>
              <button
                className="task-delete km-icon-button-error"
                onClick={() => {
                  handleDelete(feladat.id);
                }}
              >
                T
              </button>
            </div>
          ))
        )}
      </div>
      <div className="todo-input-container">
        <div className="todo-input-wrapper">
          <label htmlFor="taskName" className="km-label">
            Feladat Neve
          </label>
          <input
            type="text"
            id="taskName"
            className="km-input"
            placeholder="Feladat Neve"
            value={taskName}
            onChange={handleTaskNameChange}
          />
        </div>
        <div className="todo-input-wrapper">
          <label htmlFor="taskDue" className="km-label">
            Elkészítési Határidő
          </label>
          <input
            type="date"
            id="taskDue"
            className="km-input"
            placeholder="Elkeszitesi Hatarido"
            value={dueDate}
            onChange={handleDueDateChange}
          />
        </div>

        <button
          className="km-button"
          onClick={() => {
            handleCreate(0, taskName, dueDate);
          }}
        >
          Felvétel
        </button>
      </div>
    </div>
  );
}

export default TodoTeacherPage;
