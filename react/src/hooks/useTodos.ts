import { useEffect, useState } from "react";
import { TodoTask } from "../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

export function useTodos() {
  const [data, setData] = useState<TodoTask[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const fetchData = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.status === 401) {
        navigate('/');
      }
      if (response.status !== 200) {
        alert("Sikertelen betöltés")
      }
      const result: TodoTask[] = await response.json();
      setData(result);
    } catch {
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (url: string, id: number) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        navigate('/');
      }
      if (response.status !== 200) {
        alert("Sikertelen törlés")
      } else {
        alert("Feladat törölve");
      }
      const updatedData = data?.filter((item) => item.id !== id);
      setData(updatedData);
    } catch {
      /* empty */
    } finally {
      /* empty */
    }
  };

  const updateTodo = async (
    url: string,
    done: number,
    title: string,
    due: string,
    student_id: number
  ) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: student_id,
          title: title,
          due: due,
          done: done,
        }),
      });
      if (response.status === 401) {
        navigate('/');
      }
      if (response.status !== 200 && response.status !== 201) {
        alert("Sikertelen mentés")
      } else {
        alert("Sikeres mentés");
      }
      const result: TodoTask = await response.json();
      const updatedTodos = data?.map((todo) => {
        if (todo.id === result.id) {
          todo.title = result.title;
          todo.due = result.due;
          todo.done = result.done;
          todo.student_id = result.student_id;
          return { ...todo };
        }
        return todo;
      });
      setData(updatedTodos);
    } catch {
      /* empty */
    } finally {
      /* empty */
    }
  };

  const createTodo = async (
    url: string,
    done: number,
    title: string,
    due: string,
    student_id: number
  ) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: student_id,
          title: title,
          due: due,
          done: done,
        }),
      });
      if (response.status === 401) {
        navigate('/');
      }
      if (response.status !== 200 && response.status !== 201) {
        alert("Sikertelen művelet")
      } else {
        alert("Feladat elkeszitve");
      }
      const result: TodoTask = await response.json();
      const newTodo = {
        id: result.id,
        student_id: result.student_id,
        title: result.title,
        due: result.due,
        done: result.done,
      };
      setData((prevData) => (prevData ? [...prevData, newTodo] : [newTodo]));
    } catch {
      /* empty */
    } finally {
      /* empty */
    }
  };

  useEffect(() => {
    setData(data);
  }, [data]);

  return {
    setData,
    data,
    loading,
    error,
    fetchData,
    deleteTodo,
    updateTodo,
    createTodo,
  };
}
