import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";

function QuizSubmissions() {
  const { quizId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/quizzes/${quizId}/submissions`)
      .then(res => setSubmissions(res.data))
      .finally(() => setLoading(false));
  }, [quizId]);

  if (loading) return <p>Loading submissions...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Quiz Submissions
      </h2>

      {submissions.length === 0 ? (
        <p className="text-gray-500">
          No students have submitted this quiz yet.
        </p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Student</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Score</th>
              <th className="text-left py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map(s => (
              <tr key={s.attemptId} className="border-b">
                <td className="py-2">{s.fullName}</td>
                <td className="py-2">{s.email}</td>
                <td className="py-2">{s.score}</td>
                <td className="py-2">
                  <Link
                    to={`/instructor/quizzes/attempt/${s.attemptId}`}
                    className="text-blue-600 hover:underline"
                  >
                    View / Grade
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default QuizSubmissions;
