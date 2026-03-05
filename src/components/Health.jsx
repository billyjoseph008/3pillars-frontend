import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Health() {
  const [status, setStatus] = useState("loading...");

  useEffect(() => {
    api
      .get("/health")
      .then((data) => setStatus(data.status ?? String(data)))
      .catch(() => setStatus("error"));
  }, []);

  return <p>Backend status: {status}</p>;
}
