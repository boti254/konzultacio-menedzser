import { useEffect, useState } from "react";
import { User } from "../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

export function useUsers() {
  const [data, setData] = useState<User[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const fetchUsers = async (url: string) => {
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
      const result: User[] = await response.json();
      setData(result);
    } catch {
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (url: string, id: number) => {
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
        alert("Cannot delete user.");
      } else {
        alert("Felhasznalo torolve");
        const updatedData = data?.filter((item) => item.id !== id);
        setData(updatedData);
      }
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
    fetchUsers,
    deleteUser,
  };
}
