import { useEffect, useState } from "react";
import { Meeting } from "../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

export function useMeeting() {
  const [data, setData] = useState<Meeting>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const fetchMeetingById = async (url: string) => {
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
      const result: Meeting = await response.json();
      setData(result);
    } catch {
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const applyToMeeting = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

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

  const updateMeeting = async (
    url: string,
    date: string,
    location: string,
    count: number,
    id: number
  ) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          location: location,
          count: count,
        }),
      });
      if (response.status !== 200 && response.status !== 201) {
        navigate("/");
      } else {
        alert("Sikeres mentes");
      }
      const result: Meeting = await response.json();
      if (id === 0) {
        navigate(`/appointment-teacher-edit/${result.id}`);
      }
      setData(result);
    } catch {
      /* empty */
    } finally {
      /* empty */
    }
  };

  const acceptApply = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status !== 200) {
        const { message }: { message: string } = await response.json();
        alert(message);
      } else {
        alert("Elfogadva");
      }
      //const result: Meeting = await response.json();
      //setData(result);
    } catch {
      setError(null);
    } finally {
      /* empty */
    }
  };

  const deleteApply = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: "Delete",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status !== 200) {
        const { message }: { message: string } = await response.json();
        alert(message);
      } else {
        alert("Sikeres torles");
      }
      //const result: Meeting = await response.json();
      //setData(result);
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
    fetchMeetingById,
    applyToMeeting,
    updateMeeting,
    acceptApply,
    deleteApply,
  };
}
