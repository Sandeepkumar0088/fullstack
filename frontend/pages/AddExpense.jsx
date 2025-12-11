import { useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddExpense() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    amount: "",
    paidBy: "",
    participants: [],
    category: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/expenses", { ...form, group: id });
      toast.success("Expense added!");
      nav(`/group/${id}`);
    } catch {
      toast.error("Add failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <input
        placeholder="Paid By (user ID)"
        onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
      />
      <input
        placeholder="Participants (comma IDs)"
        onChange={(e) =>
          setForm({
            ...form,
            participants: e.target.value.split(",").map((u) => ({
              user: u.trim(),
              share: 0,
            })),
          })
        }
      />
      <button>Add Expense</button>
    </form>
  );
}
