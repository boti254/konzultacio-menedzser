import { useEffect, useState } from "react";
import { MeetingStudent } from "../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

export function useMeetings() {
  const [data, setData] = useState<MeetingStudent[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const fetchMeetings = async (url: string) => {
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
      const result: MeetingStudent[] = await response.json();
      setData(result);
    } catch {
      setError(null);
    } finally {
      setLoading(false);
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
    fetchMeetings,
  };
}
