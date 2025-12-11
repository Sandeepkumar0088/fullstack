import { useEffect, useState } from "react";
import API from "../api";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function GroupDetails() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const g = await API.get(`/groups/${id}`);
        setGroup(g.data);
        const e = await API.get(`/expenses/${id}`);
        setExpenses(e.data);
      } catch {
        toast.error("Failed to load");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const downloadCSV = () => {
    window.open(`${API.defaults.baseURL}/expenses/report/${id}`, "_blank");
  };

  return (
    <>
      <Link to="/">Back</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{group.name}</h2>
          <button onClick={downloadCSV}>Export CSV</button>
          <Link to={`/group/${id}/add-expense`}>Add Expense</Link>

          <ul>
            {expenses.map((ex) => (
              <li key={ex._id}>
                <strong>{ex.title}</strong>: {ex.amount}
                <Link to={`/expense/edit/${ex._id}`}>Edit</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
