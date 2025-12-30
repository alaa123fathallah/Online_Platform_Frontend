import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function CreateLesson() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [order, setOrder] = useState(1);
  const [estimatedDuration, setEstimatedDuration] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/lessons", {
        title,
        content,
        videoUrl,
        order,
        estimatedDuration,
        courseId: Number(courseId),
      });

      // ✅ go back to lessons list
      navigate(`/instructor/courses/${courseId}/lessons`);
    } catch (err) {
      console.error("Failed to create lesson", err);
      setError("Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Add New Lesson</h1>

      {error && (
        <p className="text-red-600 bg-red-100 p-3 rounded">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">
            Lesson Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-1">
            Lesson Content
          </label>
          <textarea
            rows="5"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block font-medium mb-1">
            Video URL (optional)
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Order */}
        <div>
          <label className="block font-medium mb-1">
            Lesson Order
          </label>
          <input
            type="number"
            min="1"
            required
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Estimated Duration */}
        <div>
          <label className="block font-medium mb-1">
            Estimated Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            required
            value={estimatedDuration}
            onChange={(e) => setEstimatedDuration(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() =>
              navigate(`/instructor/courses/${courseId}/lessons`)
            }
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Create Lesson"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateLesson;
