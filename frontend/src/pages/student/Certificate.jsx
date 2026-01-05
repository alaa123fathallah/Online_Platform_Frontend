import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import { getUserIdFromToken } from "../../utils/auth";

function Certificate() {
  const { courseId } = useParams();
  const userId = getUserIdFromToken();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    api.post("/certificates/generate", {
      userId,
      courseId: Number(courseId)
    }).then(() => {
      api.get(`/certificates/user/${userId}`).then(res => {
        setCertificate(res.data.find(c => c.courseId === Number(courseId)));
      });
    });
  }, [courseId]);

  if (!certificate) return <p>Generating certificate...</p>;

  return (
    <div className="flex justify-center">
      <div className="bg-white p-10 rounded shadow max-w-xl w-full text-center space-y-4">
        <h1 className="text-3xl font-bold text-blue-600">
          Certificate of Completion
        </h1>

        <p>You have successfully completed</p>
        <p className="text-xl font-semibold">{certificate.courseTitle}</p>

        <a
          href={certificate.downloadUrl}
          className="bg-green-600 text-white px-6 py-2 rounded inline-block"
        >
          Download Certificate
        </a>

        <Link
          to="/student/dashboard"
          className="block text-blue-600 hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Certificate;
