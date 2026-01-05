import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function QuizAttempt() {
  const { attemptId } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [newScore, setNewScore] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/quizzes/attempt/${attemptId}`)
      .then(res => {
        setAttempt(res.data);
        setNewScore(res.data.score);
      })
      .finally(() => setLoading(false));
  }, [attemptId]);

  const submitGrade = async () => {
    await api.put(`/quizzes/attempt/${attemptId}/grade`, Number(newScore));
    alert("Grade updated");
  };

  if (loading) return <p>Loading attempt...</p>;
  if (!attempt) return <p>Attempt not found.</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">
          Student Submission
        </h2>

        <p className="mt-2">
          Current Score: <strong>{attempt.score}</strong>
        </p>

        <div className="mt-4 flex items-center gap-4">
          <input
            type="number"
            value={newScore}
            onChange={e => setNewScore(e.target.value)}
            className="border px-3 py-1 rounded w-24"
          />

          <button
            onClick={submitGrade}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Grade
          </button>
        </div>
      </div>

      {/* QUESTIONS + ANSWERS */}
      {attempt.questions.map((q, idx) => (
        <div key={idx} className="bg-white p-6 rounded shadow">
          <p className="font-medium mb-3">
            {idx + 1}. {q.questionText}
          </p>

          {q.answers.map((a, i) => (
            <p
              key={i}
              className={a.isCorrect ? "text-green-600" : "text-gray-700"}
            >
              {a.answerText}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default QuizAttempt;
