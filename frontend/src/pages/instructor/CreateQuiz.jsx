import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function CreateQuiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    lessonId: "",
    passingScore: 50,
    timeLimit: 10,
    type: "MCQ",
  });

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await api.get(`/lessons/course/${courseId}`);
        setLessons(res.data);
      } catch (err) {
        console.error("Failed to load lessons", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/quizzes", {
        title: form.title,
        courseId: Number(courseId),
        lessonId: Number(form.lessonId),
        passingScore: Number(form.passingScore),
        timeLimit: Number(form.timeLimit),
        type: form.type,
      });

      // ✅ redirect to question creation
      navigate(`/instructor/quizzes/${res.data.id}/questions`);
    } catch (err) {
      console.error("Failed to create quiz", err);
      alert("Failed to create quiz");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Create Quiz</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block font-medium">Quiz Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Lesson</label>
          <select
            name="lessonId"
            value={form.lessonId}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select lesson</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>{l.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Quiz Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="MCQ">MCQ</option>
            <option value="Subjective">Subjective</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Passing Score (%)</label>
          <input
            type="number"
            name="passingScore"
            value={form.passingScore}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Time Limit (minutes)</label>
          <input
            type="number"
            name="timeLimit"
            value={form.timeLimit}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Create Quiz
        </button>
      </form>
    </div>
  );
}

export default CreateQuiz;
