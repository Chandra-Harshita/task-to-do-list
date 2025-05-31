import Task from './task'
function Content({ tasks, handleEdit, onDelete, onFinish, fetching }) {
  if (fetching) return <>Data is fetching......</>
  return (
    <main className="p-6">
      {tasks.length === 0 ? (
        <p className="text-gray-500 italic">No tasks found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Task
              key={task._id}
              data={task}
              onEdit={handleEdit}
              onDelete={onDelete}
              onFinish={onFinish}
            />
          ))}
        </div>
      )}
    </main>
  )
}
export default Content
