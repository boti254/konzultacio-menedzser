import { useEffect, useState } from "react";
import { Message } from "../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";

export function useMessages() {
  const [data, setData] = useState<Message[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const fetchMessages = async (url: string) => {
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
      const result: Message[] = await response.json();
      setData(result);
    } catch {
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (url: string, message: string) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });
      if (response.status === 401) {
        navigate('/');
     }
      if (response.status !== 200 && response.status !== 201) {
        alert("Sikertelen betöltés")
      }
      const result: Message = await response.json();
      const temp = data !== undefined ? [...data, result] : [];
      setData(temp);
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
    sendMessage,
    data,
    loading,
    error,
    fetchMessages,
  };
}
