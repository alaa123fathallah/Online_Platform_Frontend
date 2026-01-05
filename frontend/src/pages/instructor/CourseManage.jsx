import { NavLink, Outlet, Navigate, useParams } from "react-router-dom";

function CourseManage() {
  const { courseId } = useParams();

  const base = `/instructor/courses/${courseId}/manage`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Course Management</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2">
        <NavLink
          to={`${base}/lessons`}
          className={({ isActive }) =>
            isActive ? "font-semibold text-blue-600" : "text-gray-600"
          }
        >
          Lessons
        </NavLink>

        <NavLink
          to={`${base}/quizzes`}
          className={({ isActive }) =>
            isActive ? "font-semibold text-blue-600" : "text-gray-600"
          }
        >
          Quizzes
        </NavLink>

        <NavLink
          to={`${base}/students`}
          className={({ isActive }) =>
            isActive ? "font-semibold text-blue-600" : "text-gray-600"
          }
        >
          Students
        </NavLink>

        <NavLink
          to={`${base}/edit`}
          className={({ isActive }) =>
            isActive ? "font-semibold text-blue-600" : "text-gray-600"
          }
        >
          Edit
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}

export default CourseManage;
