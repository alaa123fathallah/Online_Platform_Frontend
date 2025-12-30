import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

function CreateQuestion({ quizId }) {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("MCQ");
  const [answers, setAnswers] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!questionText.trim()) {
      setError("Question text is required");
      return;
    }

    if (questionType === "MCQ") {
      if (!answers.some((a) => a.isCorrect)) {
        setError("Select at least one correct answer");
        return;
      }
    }

    let payload = {
      questionText,
      questionType,
      answers: [],
    };

    if (questionType === "MCQ") {
      payload.answers = answers.map((a) => ({
        answerText: a.text,
        isCorrect: a.isCorrect,
      }));
    }

    if (questionType === "TF") {
      payload.answers = [
        { answerText: "True", isCorrect: true },
        { answerText: "False", isCorrect: false },
      ];
    }

    try {
      setLoading(true);

      await api.post(`/quizzes/${quizId}/questions`, payload);

      setQuestionText("");
      setAnswers([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ]);

      toast.success("Question saved"); // ✅ TOAST
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to save question"); // ✅ TOAST
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Create Question</h2>

      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>
      )}

      <input
        className="w-full border p-2 rounded"
        placeholder="Question text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={questionType}
        onChange={(e) => setQuestionType(e.target.value)}
      >
        <option value="MCQ">MCQ</option>
        <option value="TF">True / False</option>
        <option value="MSQ">Subjective</option>
      </select>

      {questionType === "MCQ" &&
        answers.map((a, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              className="border p-1 flex-1 rounded"
              placeholder={`Answer ${i + 1}`}
              value={a.text}
              onChange={(e) => {
                const copy = [...answers];
                copy[i].text = e.target.value;
                setAnswers(copy);
              }}
            />
            <input
              type="checkbox"
              checked={a.isCorrect}
              onChange={(e) => {
                const copy = [...answers];
                copy[i].isCorrect = e.target.checked;
                setAnswers(copy);
              }}
            />
          </div>
        ))}

      {questionType === "MCQ" && (
        <button
          type="button"
          onClick={() =>
            setAnswers([...answers, { text: "", isCorrect: false }])
          }
          className="text-blue-600 text-sm"
        >
          + Add Answer
        </button>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save Question"}
      </button>
    </div>
  );
}

export default CreateQuestion;
