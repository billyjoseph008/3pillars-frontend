import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createRandomUser,
  deleteRandomUser,
  getRandomUsers,
  updateRandomUser,
} from "../api/randomUsers";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const data = await getRandomUsers();
      setUsers(data ?? []);
    } catch (e) {
      setError(e?.message ?? "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;

    return users.filter((u) => {
      const text = `${u.firstname ?? ""} ${u.lastname ?? ""} ${u.country ?? ""} ${
        u.age ?? ""
      }`.toLowerCase();
      return text.includes(q);
    });
  }, [users, query]);

  const createUser = useCallback(async (payload) => {
    setError("");
    const created = await createRandomUser(payload);
    setUsers((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateUser = useCallback(async (id, payload) => {
    setError("");
    const updated = await updateRandomUser(id, payload);
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    return updated;
  }, []);

  const deleteUser = useCallback(async (id) => {
    setError("");
    await deleteRandomUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  return {
    users,
    filteredUsers,
    query,
    setQuery,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}