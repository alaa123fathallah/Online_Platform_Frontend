import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function QuizResult() {
  const { id } = useParams(); // quizId
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await api.get(`/quizzes/${id}/result`);
      setResult(res.data);
    };

    fetchResult();
  }, [id]);

  if (!result) return <p>Loading result...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Quiz Result</h1>

      {!result.isGraded ? (
        <p className="text-yellow-600">
          ⏳ Waiting for instructor grading
        </p>
      ) : (
        <>
          <p className="text-lg">
            Score: <strong>{result.score}</strong>
          </p>
          <p
            className={`mt-2 font-semibold ${
              result.isPassed ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.isPassed ? "Passed ✔" : "Failed ✖"}
          </p>
        </>
      )}
    </div>
  );
}

export default QuizResult;
