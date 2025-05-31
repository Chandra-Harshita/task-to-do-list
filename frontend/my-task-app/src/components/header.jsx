function Header({ onAddClick, finished, pending }) {
  return (
    <nav className="flex items-center justify-between bg-blue-600 text-white px-6 py-4 shadow-md rounded-b-2xl">
      <h3
        className="text-2xl font-bold tracking-wide"
        onClick={() => {
          finished(false)
          pending(false)
        }}
      >
        TO DO APP
      </h3>
      <div className="flex items-center gap-6 text-sm sm:text-base">
        <span
          className="hover:underline cursor-pointer"
          onClick={() => {
            pending(true)
            finished(false)
          }}
        >
          Pending tasks
        </span>
        <span
          className="hover:underline cursor-pointer"
          onClick={() => {
            finished(true)
            pending(false)
          }}
        >
          Finished tasks
        </span>
        <button
          className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 transition duration-200"
          onClick={onAddClick}
        >
          Add task
        </button>
      </div>
    </nav>
  )
}

export default Header
