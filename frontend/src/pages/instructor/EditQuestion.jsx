import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

function EditQuestion() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    api.get(`/questions/${questionId}`).then(res => setQuestion(res.data));
  }, [questionId]);

  if (!question) return <p>Loading...</p>;

  const save = async () => {
    await api.put(`/questions/${questionId}`, question);
    toast.success("Question updated");
    navigate(-1);
  };

  const del = async () => {
    if (!confirm("Delete question?")) return;
    await api.delete(`/questions/${questionId}`);
    toast.success("Question deleted");
    navigate(-1);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Edit Question</h1>

      <input value={question.text} onChange={e => setQuestion({ ...question, text: e.target.value })} className="border p-2 w-full" />

      <div className="flex gap-2">
        <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        <button onClick={del} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  );
}

export default EditQuestion;
