import { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditExpense() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    API.get(`/expenses/${id}`)
      .then(({ data }) => setForm(data))
      .catch(() => toast.error("Load failed"));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/expenses/${id}`, form);
      toast.success("Updated");
      nav(-1);
    } catch {
      toast.error("Update failed");
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={submit}>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <button>Save</button>
    </form>
  );
}
