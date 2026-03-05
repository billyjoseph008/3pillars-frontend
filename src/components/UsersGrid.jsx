import { UserCard } from "./UserCard";

export function UsersGrid({ users, loading, onEdit, onDelete }) {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>
        Users {loading ? "(loading…)" : `(${users.length})`}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {users.map((u) => (
          <UserCard key={u.id} user={u} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>

      {!loading && users.length === 0 && (
        <div style={{ marginTop: 10, opacity: 0.8 }}>No users found.</div>
      )}
    </div>
  );
}