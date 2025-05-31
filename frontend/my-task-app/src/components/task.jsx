function Task({ data, onEdit, onDelete, onFinish }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition duration-200">
      <h3 className="text-xl font-semibold text-blue-600">{data.name}</h3>
      <p className="text-sm text-gray-500 mt-1">
        Deadline: <span className="font-medium">{data.deadline}</span>
      </p>
      {data.description && (
        <p className="text-gray-700 mt-2">{data.description}</p>
      )}
      <span
        className={`inline-block mt-3 px-3 py-1 text-sm rounded-full font-medium ${
          data.status === 'finished'
            ? 'bg-green-100 text-green-700'
            : data.status === 'pending'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {data.status}
      </span>

      <div className="mt-4 flex gap-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => onEdit(data)} // 👈 call onEdit to trigger modal
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(data._id)}
        >
          Delete
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={() => onFinish(data._id)}
        >
          Mark as Done
        </button>
      </div>
    </div>
  )
}

export default Task
