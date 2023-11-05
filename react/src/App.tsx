import { useEffect, useState } from "react";
import "./App.css";

interface TestInterface {
  id: number;
  text: string;
}

function App() {
  const { data, loading } = useApi("https://szoftarch.webgravir.hu/api/test/1");
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return <div>{data?.text}</div>;
  }
}

function useApi(initialUrl: string) {
  const [data, setData] = useState<TestInterface>();
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

      const result: TestInterface = await response.json();

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

export default App;
