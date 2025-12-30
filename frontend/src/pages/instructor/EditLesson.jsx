import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

function EditLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    api.get(`/lessons/${lessonId}`).then(res => setLesson(res.data));
  }, [lessonId]);

  if (!lesson) return <p>Loading...</p>;

  const save = async () => {
    await api.put(`/lessons/${lessonId}`, lesson);
    toast.success("Lesson updated");
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Lesson</h1>

      <input value={lesson.title} onChange={e => setLesson({ ...lesson, title: e.target.value })} className="w-full border p-2" />
      <textarea value={lesson.content} onChange={e => setLesson({ ...lesson, content: e.target.value })} className="w-full border p-2" />

      <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </div>
  );
}

export default EditLesson;
