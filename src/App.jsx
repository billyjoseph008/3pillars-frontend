import "./App.css";
import { useState } from "react";
import { StepsBar } from "./components/StepsBar";
import { UserForm } from "./components/UserForm";
import { UsersFilter } from "./components/UsersFilter";
import { UsersGrid } from "./components/UsersGrid";
import { useSteps } from "./hooks/useSteps";
import { useUsers } from "./hooks/useUsers";

export default function App() {
  const { steps } = useSteps();

  const {
    filteredUsers,
    query,
    setQuery,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [editingUser, setEditingUser] = useState(null);

  async function handleSubmit(form) {
    if (editingUser) {
      await updateUser(editingUser.id, form);
      setEditingUser(null);
      return;
    }
    await createUser(form);
  }

  async function handleDelete(id) {
    const ok = confirm("Delete this user?");
    if (!ok) return;
    await deleteUser(id);
    if (editingUser?.id === id) setEditingUser(null);
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      <h1>3 Pillars Frontend</h1>

      <StepsBar steps={steps} />

      <UsersFilter value={query} onChange={setQuery} onReload={loadUsers} />

      {error && (
        <div style={{ marginBottom: 12, color: "salmon" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
        <UserForm
          editingUser={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => setEditingUser(null)}
        />
        <UsersGrid
          users={filteredUsers}
          loading={loading}
          onEdit={setEditingUser}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}