import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

/* Layout */
import MainLayout from "./layouts/MainLayout";

/* Auth pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* Student pages */
import StudentDashboard from "./pages/student/StudentDashboard";
import Courses from "./pages/student/Courses";
import CourseDetails from "./pages/student/CourseDetails";
import Lesson from "./pages/student/Lesson";
import Certificates from "./pages/student/Certificate";

/* Instructor pages */
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import EditCourse from "./pages/instructor/EditCourse";

import CourseLessons from "./pages/instructor/CourseLessons";
import CreateLesson from "./pages/instructor/CreateLesson";
import EditLesson from "./pages/instructor/EditLesson";

import CourseQuizzes from "./pages/instructor/CourseQuizzes";
import CreateQuiz from "./pages/instructor/CreateQuiz";
import EditQuiz from "./pages/instructor/EditQuiz";

import QuizQuestions from "./pages/instructor/QuizQuestions";
import EditQuestion from "./pages/instructor/EditQuestion";

/* 🆕 Course Management Hub */
import CourseManage from "./pages/instructor/CourseManage";
import CourseStudents from "./pages/instructor/CourseStudents";

/* Route guards */
import ProtectedRoute from "./routes/ProtectedRoute";
import StudentRoute from "./routes/StudentRoute";
import InstructorRoute from "./routes/InstructorRoute";

/* HOME REDIRECT */
function HomeRedirect() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return user.role === "Instructor"
    ? <Navigate to="/instructor/dashboard" replace />
    : <Navigate to="/student/dashboard" replace />;
}

function App() {
  return (
    <>
      {/* Global toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: { fontSize: "14px" },
        }}
      />

      <MainLayout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomeRedirect />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <StudentRoute>
                  <StudentDashboard />
                </StudentRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lessons/:id"
            element={
              <ProtectedRoute>
                <Lesson />
              </ProtectedRoute>
            }
          />

          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <StudentRoute>
                  <Certificates />
                </StudentRoute>
              </ProtectedRoute>
            }
          />

          {/* Instructor */}
          <Route
            path="/instructor/dashboard"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <InstructorDashboard />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/create-course"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <CreateCourse />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          {/* =========================
              🆕 COURSE MANAGEMENT HUB
             ========================= */}
          <Route
            path="/instructor/courses/:courseId/manage"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <CourseManage />
                </InstructorRoute>
              </ProtectedRoute>
            }
          >
            <Route path="lessons" element={<CourseLessons />} />
            <Route path="quizzes" element={<CourseQuizzes />} />
            <Route path="students" element={<CourseStudents />} />
            <Route path="edit" element={<EditCourse />} />
          </Route>

          {/* =========================
              🔁 BACKWARD-COMPATIBLE ROUTES
             ========================= */}

          {/* Edit Course (old direct route) */}
          <Route
            path="/instructor/courses/:courseId/edit"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <EditCourse />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          {/* Lessons */}
          <Route
            path="/instructor/courses/:courseId/lessons"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <CourseLessons />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/courses/:courseId/lessons/create"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <CreateLesson />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/lessons/:lessonId/edit"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <EditLesson />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          {/* Quizzes */}
          <Route
            path="/instructor/courses/:courseId/quizzes"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <CourseQuizzes />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/courses/:courseId/quizzes/create"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <CreateQuiz />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/quizzes/:quizId/edit"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <EditQuiz />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          {/* Quiz Questions */}
          <Route
            path="/instructor/quizzes/:quizId/questions"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <QuizQuestions />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/instructor/questions/:questionId/edit"
            element={
              <ProtectedRoute>
                <InstructorRoute>
                  <EditQuestion />
                </InstructorRoute>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
