import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Quiz() {
  const { id } = useParams(); // quizId
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const quizRes = await api.get(`/quizzes/${id}`);
        setQuiz(quizRes.data);

        const questionsRes = await api.get(`/quizzes/${id}/questions`);
        setQuestions(questionsRes.data);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [id]);

  const handleSelect = (questionId, answerId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleSubmit = async () => {
    // ✅ Validate: all questions answered
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // ✅ EXACT DTO expected by backend
    const payload = {
      answers: Object.entries(answers).map(
        ([questionId, selectedAnswerId]) => ({
          questionId: Number(questionId),
          selectedAnswerId: Number(selectedAnswerId)
        })
      )
    };

    try {
      await api.post(`/quizzes/${id}/submit`, payload);
      alert("Quiz submitted successfully");
      navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz.");
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* QUIZ HEADER */}
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <p className="text-sm text-gray-500">
          Passing score: {quiz.passingScore}
        </p>
      </div>

      {/* QUESTIONS */}
      {questions.map((q, index) => (
        <div key={q.id} className="bg-white p-6 rounded shadow">
          <p className="font-medium mb-4">
            {index + 1}. {q.questionText}
          </p>

          {q.answers.map(a => (
            <label key={a.id} className="block mb-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${q.id}`}
                checked={answers[q.id] === a.id}
                onChange={() => handleSelect(q.id, a.id)}
              />
              <span className="ml-2">{a.answerText}</span>
            </label>
          ))}
        </div>
      ))}

      {/* SUBMIT */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}

export default Quiz;
