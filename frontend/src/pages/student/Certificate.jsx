import { useParams, Link } from "react-router-dom";

function Certificate() {
  const { courseId } = useParams();

  // UI-only mock data
  const studentName = "John Doe";
  const courseTitle = "React Basics";
  const completionDate = "26 December 2025";

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-3xl w-full text-center space-y-6 border-4 border-blue-600">
        <h1 className="text-3xl font-bold text-blue-600">
          Certificate of Completion
        </h1>

        <p className="text-lg text-gray-700">
          This certifies that
        </p>

        <p className="text-2xl font-semibold">
          {studentName}
        </p>

        <p className="text-lg text-gray-700">
          has successfully completed the course
        </p>

        <p className="text-2xl font-semibold">
          {courseTitle}
        </p>

        <p className="text-gray-600">
          Completion Date: {completionDate}
        </p>

        <div className="pt-6 flex justify-center space-x-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
            Download Certificate
          </button>

          <Link
            to="/student/dashboard"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </Link>
        </div>

        <p className="text-sm text-gray-400 pt-4">
          Certificate ID: COURSE-{courseId}-2025
        </p>
      </div>
    </div>
  );
}

export default Certificate;
