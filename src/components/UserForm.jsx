import { useEffect, useState } from "react";

const emptyForm = { firstname: "", lastname: "", age: 18, country: "", avatar: "" };

export function UserForm({ editingUser, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingUser) {
      setForm({
        firstname: editingUser.firstname ?? "",
        lastname: editingUser.lastname ?? "",
        age: editingUser.age ?? 18,
        country: editingUser.country ?? "",
        avatar: editingUser.avatar ?? "",
      });
    } else {
      setForm(emptyForm);
    }
    setError("");
  }, [editingUser]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "age" ? Number(value) : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.firstname.trim() || !form.lastname.trim()) {
      setError("Firstname and lastname are required.");
      return;
    }
    if (!Number.isFinite(form.age) || form.age <= 0) {
      setError("Age must be a positive number.");
      return;
    }

    await onSubmit(form);
    setForm(emptyForm);
  }

  return (
    <div style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>{editingUser ? "Edit user" : "Create user"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          name="firstname"
          value={form.firstname}
          onChange={onChange}
          placeholder="Firstname"
          style={{ padding: 10, borderRadius: 8, border: "1px solid #444" }}
        />
        <input
          name="lastname"
          value={form.lastname}
          onChange={onChange}
          placeholder="Lastname"
          style={{ padding: 10, borderRadius: 8, border: "1px solid #444" }}
        />
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={onChange}
          placeholder="Age"
          style={{ padding: 10, borderRadius: 8, border: "1px solid #444" }}
        />
        <input
          name="country"
          value={form.country}
          onChange={onChange}
          placeholder="Country"
          style={{ padding: 10, borderRadius: 8, border: "1px solid #444" }}
        />
        <input
          name="avatar"
          value={form.avatar}
          onChange={onChange}
          placeholder="Avatar URL"
          style={{ padding: 10, borderRadius: 8, border: "1px solid #444" }}
        />

        {error && <div style={{ color: "salmon" }}>{error}</div>}

        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" style={{ padding: "10px 14px", borderRadius: 8 }}>
            {editingUser ? "Update" : "Create"}
          </button>
          {editingUser && (
            <button
              type="button"
              onClick={onCancel}
              style={{ padding: "10px 14px", borderRadius: 8 }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}