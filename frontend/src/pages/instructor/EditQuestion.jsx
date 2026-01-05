import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

function EditQuestion() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    questionText: "",
    questionType: "MCQ",
    answers: [],
  });

  // ===============================
  // LOAD QUESTION ✅ CORRECT ENDPOINT
  // ===============================
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await api.get(`/questions/${questionId}`);

        setForm({
          questionText: res.data.questionText,
          questionType: res.data.questionType,
          answers: (res.data.answers || []).map((a) => ({
            id: a.id,
            answerText: a.answerText,
            isCorrect: a.isCorrect ?? false,
          })),
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  // ===============================
  // SAVE
  // ===============================
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/questions/${questionId}`, {
        questionText: form.questionText,
        questionType: form.questionType,
        answers: form.answers.map((a) => ({
          answerText: a.answerText,
          isCorrect: a.isCorrect,
        })),
      });

      toast.success("Question updated");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update question");
    }
  };

  // ===============================
  // DELETE
  // ===============================
  const handleDelete = async () => {
    try {
      await api.delete(`/questions/${questionId}`);
      toast.success("Question deleted");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete question");
    }
  };

  // ===============================
  // RENDER
  // ===============================
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Question</h1>

      <form
        onSubmit={handleSave}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <div>
          <label className="block font-medium">Question</label>
          <input
            value={form.questionText}
            onChange={(e) =>
              setForm({ ...form, questionText: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Type</label>
          <select
            value={form.questionType}
            onChange={(e) =>
              setForm({ ...form, questionType: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          >
            <option value="MCQ">MCQ</option>
            <option value="Subjective">Subjective</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="block font-medium">Answers</label>

          {form.answers.map((a, i) => (
            <div key={a.id ?? i} className="flex items-center gap-3">
              <input
                value={a.answerText}
                onChange={(e) => {
                  const updated = [...form.answers];
                  updated[i].answerText = e.target.value;
                  setForm({ ...form, answers: updated });
                }}
                className="flex-1 border px-3 py-2 rounded"
                required
              />

              <label className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={a.isCorrect}
                  onChange={(e) => {
                    const updated = [...form.answers];
                    updated[i].isCorrect = e.target.checked;
                    setForm({ ...form, answers: updated });
                  }}
                />
                Correct
              </label>
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded"
          >
            Delete Question
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditQuestion;
