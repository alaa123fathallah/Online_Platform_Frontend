import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function GradeQuiz() {
  const { attemptId } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    api.get(`/quizzes/attempts/${attemptId}`).then((res) => {
      setAttempt(res.data);
    });
  }, [attemptId]);

  const submitGrades = async () => {
    await api.post(`/quizzes/attempts/${attemptId}/grade`, {
      grades,
    });
    alert("Quiz graded");
  };

  if (!attempt) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {attempt.studentAnswers.map((a) => (
        <div key={a.id} className="bg-white p-4 shadow">
          <p>{a.textAnswer}</p>
          <input
            type="number"
            placeholder="Points"
            onChange={(e) =>
              setGrades((g) => [
                ...g.filter((x) => x.studentAnswerId !== a.id),
                {
                  studentAnswerId: a.id,
                  pointsAwarded: Number(e.target.value),
                },
              ])
            }
          />
        </div>
      ))}

      <button
        onClick={submitGrades}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Submit Grades
      </button>
    </div>
  );
}

export default GradeQuiz;
