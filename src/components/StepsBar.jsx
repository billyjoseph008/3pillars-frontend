export function StepsBar({ steps }) {
  const entries = Object.entries(steps ?? {});
  return (
    <div style={{ marginBottom: 12 }}>
      <strong>Steps (middleware):</strong>{" "}
      {entries.length === 0 ? (
        <span>-</span>
      ) : (
        <span>{entries.map(([k, v]) => `${k}→${v}`).join(" | ")}</span>
      )}
    </div>
  );
}