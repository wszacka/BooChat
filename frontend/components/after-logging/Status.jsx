import { useEffect, useState } from "react";

export default function Status() {
  const statusOptions = ["Available", "Be Right Back", "Unavailable"];
  const [status, setStatus] = useState(() => {
    return localStorage.getItem("userStatus") || "Available";
  });

  useEffect(() => {
    localStorage.setItem("userStatus", status);
  }, [status]);

  return (
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className={status}
    >
      {statusOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
