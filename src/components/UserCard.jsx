export function UserCard({ user, onEdit, onDelete }) {
  return (
    <div style={{ border: "1px solid #333", borderRadius: 12, padding: 12, display: "grid", gap: 8 }}>
      <img
        src={user.avatar}
        alt={`${user.firstname} ${user.lastname}`}
        style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10, background: "#222" }}
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Avatar";
        }}
      />
      <div style={{ fontWeight: 700 }}>
        {user.firstname} {user.lastname}
      </div>
      <div style={{ opacity: 0.85 }}>
        {user.country} • {user.age}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onEdit(user)} style={{ padding: "8px 10px", borderRadius: 8 }}>
          Edit
        </button>
        <button onClick={() => onDelete(user.id)} style={{ padding: "8px 10px", borderRadius: 8 }}>
          Delete
        </button>
      </div>
    </div>
  );
}