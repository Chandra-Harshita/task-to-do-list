import { useState } from 'react'
function TaskInput({ onAdd, initialData, isEdit }) {
  const [name, setName] = useState(isEdit ? initialData.name : '')
  const [deadline, setDeadline] = useState(
    initialData ? initialData.deadline.slice(0, 10) : ''
  ) // format date as yyyy-mm-dd
  const [description, setDescription] = useState(initialData?.description || '')
  const [status, setStatus] = useState(initialData?.status || 'pending')

  const handleSubmit = (e) => {
    e.preventDefault()
    const taskData = {
      name,
      deadline,
      description,
      status,
    }
    if (initialData?._id) taskData._id = initialData._id

    onAdd(taskData)

    setName('')
    setDeadline('')
    setDescription('')
    setStatus('pending')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md max-w-xl mx-auto space-y-4"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border p-2 rounded"
      ></textarea>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="other">Other</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {initialData ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  )
}

export default TaskInput
