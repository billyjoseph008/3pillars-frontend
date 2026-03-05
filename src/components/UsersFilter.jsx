export function UsersFilter({ value, onChange, onReload }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
      <input
        placeholder="Filter users (name, country, age)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #444" }}
      />
      <button onClick={onReload} style={{ padding: "10px 14px", borderRadius: 8 }}>
        Reload
      </button>
    </div>
  );
}