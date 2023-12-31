import { useEffect, useState } from "react";
import { User } from "../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const fetchUser = async (url: string) => {
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
      const result: User = await response.json();
      setUser(result);
    } catch {
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    name: string,
    email: string,
    password: string,
    neptun: string,
    student: number,
    teacher: number,
    admin: number,
    url: string
  ) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          neptun: neptun,
          student: student,
          teacher: teacher,
          admin: admin,
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
      const result: User = await response.json();
      setUser(result);
    } catch {
      /* empty */
    } finally {
      /* empty */
    }
  };

  const createUser = async (
    name: string,
    email: string,
    password: string,
    neptun: string,
    student: boolean,
    teacher: boolean,
    admin: boolean,
    url: string,
    isnew: boolean
  ) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          neptun: neptun,
          student: student,
          teacher: teacher,
          admin: admin,
        }),
      });
      if (response.status === 401) {
        navigate('/');
      }
      if (response.status !== 200 && response.status !== 201) {
        alert("Sikertelen művelet")
      } else {
        alert("Felhasznaló hozzáadva");
      }
      const result: User = await response.json();
      setUser(result);
      if (isnew) {
        navigate(`/user-edit/${result.id}`);
      }
    } catch {
      /* empty */
    } finally {
      /* empty */
    }
  };

  useEffect(() => {
    setUser(user);
  }, [user]);

  return {
    loading,
    error,
    user,
    createUser,
    fetchUser,
    updateUser,
  };
}
