import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import API from "../api";
import { toast } from "react-toastify";

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      setUser({ token: data.token });
      toast.success("Registered!");
    } catch (err) {
      toast.error(err.response?.data.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button disabled={loading}>Register</button>
    </form>
  );
}
