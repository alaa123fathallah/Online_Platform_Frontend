import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";

function CreateCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    category: "Web Development",
    difficulty: "Beginner",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/courses", form);
      navigate("/instructor/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        Create New Course
      </h1>

      {error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        <div>
          <label className="block font-medium mb-1">
            Course Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Short Description
          </label>
          <input
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Full Description
          </label>
          <textarea
            name="longDescription"
            value={form.longDescription}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Web Development</option>
              <option>Backend</option>
              <option>Database</option>
              <option>DevOps</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Thumbnail (URL)
          </label>
          <input
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            to="/instructor/dashboard"
            className="bg-gray-500 text-white px-6 py-2 rounded-md"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCourse;
