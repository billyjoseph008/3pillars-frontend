import { useCallback, useEffect, useState } from "react";
import { getSteps } from "../api/steps";

export function useSteps() {
  const [steps, setSteps] = useState({});
  const [error, setError] = useState("");

  const loadSteps = useCallback(async () => {
    setError("");
    try {
      const data = await getSteps();
      setSteps(data ?? {});
    } catch (e) {
      setError(e?.message ?? "Failed to load steps");
    }
  }, []);

  useEffect(() => {
    loadSteps();
  }, [loadSteps]);

  return { steps, stepsError: error, loadSteps };
}