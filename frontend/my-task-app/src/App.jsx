import { useState, useEffect } from 'react'
import Header from './components/header'
import Content from './components/content'
import TaskInput from './components/TaskInput'

function App() {
  const [tasks, setTasks] = useState([])
  const [editTask, setEditTask] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showPending, setShowPending] = useState(false)
  const [showFinished, setShowFinished] = useState(false)
  const [fetching, setFetching] = useState(true)

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/display')
    const data = await res.json()
    setTasks(data.data)
    setFetching(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (newTask) => {
    const res = await fetch('http://localhost:8000/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })

    const result = await res.json()
    if (result.status === 'success') {
      setTasks((prev) => [...prev, result.message])
      setShowForm(false)
    }
  }

  const updateTask = async (updatedTask) => {
    const res = await fetch(`http://localhost:8000/update/${updatedTask._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    })

    const data = await res.json()

    if (data.status === true) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      )
      setShowUpdateForm(false)
      setEditTask(null)
    } else {
      console.log('Update failed')
    }
  }
  const deleteTask = async (taskId) => {
    const res = await fetch(`http://localhost:8000/remove/${taskId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    if (data.status == true) {
      console.log('task deleted successfully')
      setTasks(tasks.filter((task) => task._id !== taskId))
    }
  }

  const finishTask = async (taskId) => {
    const res = await fetch(`http://localhost:8000/finish/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.status == true) {
      console.log('marked as done')
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: 'finished' } : task
        )
      )
    }
  }
  const handleEdit = (task) => {
    setEditTask(task)
    setShowUpdateForm(true)
  }

  return (
    <>
      <Header
        onAddClick={() => setShowForm((prev) => !prev)}
        pending={setShowPending}
        finished={setShowFinished}
      />

      {/* Add Task Modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-gray-100 bg-opacity-20 flex items-center justify-center z-50"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <TaskInput onAdd={addTask} isEdit={false} />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Update Task Modal */}
      {showUpdateForm && editTask && (
        <div
          className="fixed inset-0 bg-gray-100 bg-opacity-20 flex items-center justify-center z-50"
          onClick={() => setShowUpdateForm(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <TaskInput
              onAdd={updateTask}
              initialData={editTask}
              isEdit={true}
            />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setShowUpdateForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {!showPending && !showFinished && (
        <Content
          fetching={fetching}
          tasks={tasks}
          handleEdit={handleEdit}
          onDelete={deleteTask}
          onFinish={finishTask}
        />
      )}
      {showPending && (
        <Content
          tasks={tasks.filter((task) => task.status === 'pending')}
          handleEdit={handleEdit}
          onDelete={deleteTask}
          onFinish={finishTask}
        />
      )}
      {showFinished && (
        <Content
          tasks={tasks.filter((task) => task.status === 'finished')}
          handleEdit={handleEdit}
          onDelete={deleteTask}
          onFinish={finishTask}
        />
      )}
    </>
  )
}

export default App
