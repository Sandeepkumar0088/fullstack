import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import API from "../api";
import { toast } from "react-toastify";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      setUser({ token: data.token });
      toast.success("Logged in!");
    } catch (err) {
      toast.error(err.response?.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button disabled={loading}>Login</button>
    </form>
  );
}
