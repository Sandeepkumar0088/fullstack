import { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditGroup() {
  const { id } = useParams();
  const nav = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    API.get(`/groups/${id}`)
      .then(({ data }) => setName(data.name))
      .catch(() => toast.error("Load failed"));
  }, [id]);

  const submit = async () => {
    try {
      await API.put(`/groups/${id}`, { name });
      toast.success("Updated");
      nav(-1);
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={submit}>Save</button>
    </>
  );
}
