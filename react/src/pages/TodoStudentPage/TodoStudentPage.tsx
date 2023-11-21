import "./TodoStudentPage.css";
import { TodoTask } from "../../interfaces/Interfaces";
import BackButton from "../../components/BackButton/BackButton";
import { useTodos } from "../../hooks/useTodos";
import { useEffect } from "react";

function TodoStudentPage() {
  const { data, loading, fetchData } = useTodos();

  useEffect(() => {
    fetchData("https://szoftarch.webgravir.hu/api/todos");
  }, []);

  const newStyle = {
    color: "var(--primary-color)",
  };
  return (
    <div className="todo-student-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="todo-student-page-header">
        <div className="header-title">
          <h1>TODO</h1>
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
              <div className="task-half">{feladat.title}</div>
              <div className="task-half">{feladat.due}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoStudentPage;
