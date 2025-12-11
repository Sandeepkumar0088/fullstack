import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    API.get("/groups")
      .then((res) => setGroups(res.data))
      .catch((err) => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const createGroup = async () => {
    try {
      const { data } = await API.post("/groups", { name });
      setGroups((prev) => [...prev, data]);
      toast.success("Group added!");
    } catch {
      toast.error("Create failed");
    }
  };

  return (
    <>
      <h1>Groups</h1>
      <input
        placeholder="New group name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createGroup}>Add</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {groups.map((g) => (
            <li key={g._id}>
              <Link to={`/group/${g._id}`}>{g.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
