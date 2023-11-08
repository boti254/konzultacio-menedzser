import { useState, useEffect } from "react";
import { TodoTask } from "../interfaces/Interfaces";

export function useStudentTodos(initialUrl: string) {
  const [data, setData] = useState<TodoTask[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: TodoTask[] = await response.json();
      setData(result);
    } catch {
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(initialUrl);
  }, [initialUrl]);

  return { data, loading, error, fetchData };
}
