import toast from "react-hot-toast";

export function confirmDelete({ message, onConfirm }) {
  toast((t) => (
    <div className="flex flex-col gap-3">
      <p className="font-medium">{message}</p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 rounded border text-sm"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className="px-3 py-1 rounded bg-red-600 text-white text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  ), {
    duration: 4000,
  });
}
