import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { confirmDelete } from "../../components/ConfirmDeleteToast";

function EditCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await api.get(`/courses/${courseId}`);
        setCourse(res.data);
      } catch (err) {
        toast.error("Failed to load course");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!course) return null;

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const save = async () => {
    try {
      await api.put(`/courses/${courseId}`, course);
      toast.success("Course updated");
    } catch {
      toast.error("Failed to update course");
    }
  };

  const del = () => {
    confirmDelete({
      message: "Are you sure you want to delete this course?",
      onConfirm: async () => {
        try {
          await api.delete(`/courses/${courseId}`);
          toast.success("Course deleted");
          navigate("/instructor/dashboard");
        } catch {
          toast.error("Failed to delete course");
        }
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Course</h1>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={course.title || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Short Description
        </label>
        <textarea
          name="shortDescription"
          value={course.shortDescription || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Long Description
        </label>
        <textarea
          name="longDescription"
          value={course.longDescription || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          name="category"
          value={course.category || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Difficulty</label>
        <input
          name="difficulty"
          value={course.difficulty || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={save}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={del}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Course
        </button>
      </div>
    </div>
  );
}

export default EditCourse;
