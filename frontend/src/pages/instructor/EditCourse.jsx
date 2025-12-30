import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

function EditCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    api.get(`/courses/${courseId}`).then(res => setForm(res.data));
  }, [courseId]);

  if (!form) return <p>Loading...</p>;

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    await api.put(`/courses/${courseId}`, form);
    toast.success("Course updated");
    navigate("/instructor/dashboard");
  };

  const del = async () => {
    if (!confirm("Delete this course?")) return;
    await api.delete(`/courses/${courseId}`);
    toast.success("Course deleted");
    navigate("/instructor/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Course</h1>

      <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2" />
      <input name="shortDescription" value={form.shortDescription} onChange={handleChange} className="w-full border p-2" />
      <textarea name="longDescription" value={form.longDescription} onChange={handleChange} className="w-full border p-2" />

      <div className="flex justify-between">
        <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        <button onClick={del} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  );
}

export default EditCourse;
