import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api.get(`/quizzes/${quizId}`).then(res => setQuiz(res.data));
    api.get(`/quizzes/${quizId}/questions`).then(res => setQuestions(res.data));
  }, [quizId]);

  if (!quiz) return <p>Loading...</p>;

  const save = async () => {
    await api.put(`/quizzes/${quizId}`, quiz);
    toast.success("Quiz updated");
  };

  const del = async () => {
    if (!confirm("Delete quiz?")) return;
    await api.delete(`/quizzes/${quizId}`);
    toast.success("Quiz deleted");
    navigate(-1);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Edit Quiz</h1>

      <input value={quiz.title} onChange={e => setQuiz({ ...quiz, title: e.target.value })} className="border p-2 w-full" />

      <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      <button onClick={del} className="bg-red-600 text-white px-4 py-2 rounded ml-2">Delete</button>

      <hr />

      <h2 className="font-semibold">Questions</h2>

      {questions.map(q => (
        <div key={q.id} className="flex justify-between border p-2">
          <span>{q.text}</span>
          <Link to={`/instructor/questions/${q.id}/edit`} className="text-blue-600">Edit</Link>
        </div>
      ))}
    </div>
  );
}

export default EditQuiz;
