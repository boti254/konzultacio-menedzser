import { useEffect, useState } from "react";
import { UserPair } from "../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

export function usePairs() {
  const [data, setData] = useState<UserPair[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const fetchStudents = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.status !== 200) {
        navigate("/");
      }
      const result: UserPair[] = await response.json();
      setData(result);
    } catch {
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const applyToTeacher = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status !== 200) {
        const { message }: { message: string } = await response.json();
        alert(message);
      }
    } catch {
      setError(null);
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
    fetchStudents,
    applyToTeacher,
  };
}
