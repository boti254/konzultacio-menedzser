import "./TodoTeacherPage.css";
import BackButton from "../../components/BackButton/BackButton";
import { TodoTask, UserPair } from "../../interfaces/Interfaces";
import { useEffect, useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { usePairs } from "../../hooks/usePairs";

function TodoTeacherPage() {
  const [selectedStudentId, setSelectedStudent] = useState("");
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");

  const {
    data,
    loading,
    fetchData,
    deleteTodo,
    updateTodo,
    createTodo,
    setData,
  } = useTodos();

  const { data: userData, loading: userLoading, fetchStudents } = usePairs();

  const handleDelete = (id: number) => {
    deleteTodo(`https://szoftarch.webgravir.hu/api/todos/delete/${id}`, id);
  };

  const handleUpdate = (
    id: number,
    done: number,
    title: string,
    due: string,
    student_id: number
  ) => {
    updateTodo(
      `https://szoftarch.webgravir.hu/api/todos/store/${id}`,
      done,
      title,
      due,
      student_id
    );
  };

  const handleCreate = (
    done: number,
    title: string,
    due: string,
    student_id: number
  ) => {
    createTodo(
      `https://szoftarch.webgravir.hu/api/todos/store/0`,
      done,
      title,
      due,
      student_id
    );
  };

  useEffect(() => {
    fetchStudents("https://szoftarch.webgravir.hu/api/pairs/my-students");
  }, []);

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudent(event.target.value);
    if (event.target.value !== "Diák" && event.target.value !== "") {
      fetchData(
        `https://szoftarch.webgravir.hu/api/todos/student/${event.target.value}`
      );
    }
    if (event.target.value !== "Diák") {
      setData([]);
    }
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
          <select
            name="studentSelect"
            id="studentSelect"
            className="km-select"
            value={selectedStudentId}
            onChange={handleSelect}
          >
            <option value="">Diák</option>
            {userLoading ? (
              <option>Betöltés...</option>
            ) : (
              userData?.map((userPair: UserPair) => (
                <option key={userPair.pair.id} value={userPair.user.id}>
                  {userPair.user.name} - {userPair.user.neptun}
                </option>
              ))
            )}
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
                    dueDate,
                    Number(selectedStudentId)
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
                    feladat.due,
                    Number(selectedStudentId)
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
            handleCreate(0, taskName, dueDate, Number(selectedStudentId));
          }}
        >
          Felvétel
        </button>
      </div>
    </div>
  );
}

export default TodoTeacherPage;
