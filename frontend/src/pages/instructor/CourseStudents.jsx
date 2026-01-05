import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function CourseStudents() {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/enrollments/course/${courseId}/students`)
      .then(res => setStudents(res.data))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Enrolled Students
      </h2>

      {students.length === 0 ? (
        <p className="text-gray-500">No students enrolled.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
            </tr>
          </thead>

          <tbody>
            {students.map(s => (
              <tr key={s.userId} className="border-b">
                <td className="py-2">{s.fullName}</td>
                <td className="py-2">{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CourseStudents;
