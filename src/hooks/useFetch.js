import { useCallback, useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (signal) => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError("A valid URL is required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong while fetching data.");
        setData(null);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => controller.abort();
  }, [fetchData]);

  const refetch = useCallback(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
  }, [fetchData]);

  return { data, loading, error, refetch };
}

export default useFetch;