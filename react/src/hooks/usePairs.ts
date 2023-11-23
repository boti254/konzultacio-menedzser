import { useEffect, useState } from "react";
import { Pair, UserPair } from "../interfaces/Interfaces";
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
      if (response.status === 401) {
        navigate('/');
     }
      if (response.status !== 200) {
        alert("Sikertelen betöltés")
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
      if (response.status === 401) {
        navigate('/');
      }
      if (response.status !== 200 && response.status !== 201) {
        const { message }: { message: string } = await response.json();
        alert(message);
      } else {
        alert("Sikeres jelentkezes");
      }
    } catch {
      setError(null);
    } finally {
      /* empty */
    }
  };

  const acceptStudent = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.status === 401) {
        navigate('/');
      }
      if (response.status !== 200) {
        const { message }: { message: string } = await response.json();
        alert(message);
      } else {
        alert("Elfogadva");
      }
      const result: Pair = await response.json();
      const updatedPairs = data?.map((userPair) => {
        if (userPair.pair.id === result.id) {
          userPair.pair.teacher_id = result.teacher_id;
          userPair.pair.student_id = result.student_id;
          userPair.pair.accepted = result.accepted;
          return { ...userPair };
        }
        return userPair;
      });
      setData(updatedPairs);
    } catch {
      setError(null);
    } finally {
      /* empty */
    }
  };

  const deleteStudent = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.status === 401) {
        navigate('/');
      }
      if (response.status !== 200) {
        const { message }: { message: string } = await response.json();
        alert(message);
      } else {
        alert("Diak torolve");
      }
      const result: { message: string; pair_id: number } =
        await response.json();

      const updatedPairs = data?.filter(
        (userPair) => userPair.pair.id !== result.pair_id
      );
      setData(updatedPairs);
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
    deleteStudent,
    acceptStudent,
  };
}
