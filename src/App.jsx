import "./App.css";
import { useEffect, useState } from "react";
import { randomUsers } from "./api/randomUsers";

export default function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await randomUsers();
      setUsers(data);
    };

    loadUsers();
  }, []);

  return (
    <div className="App">
      <h1>3 Pillars Frontend</h1>
      <ul>{users.map((user, index) => (
          <li><p>{user.firstname}</p></li>
        ))}</ul>
    </div>
  );
}