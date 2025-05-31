// {
//  task_id : number ,
//  name : name of task ,
// deadline : date,
// description : if any,
// status : task_status
// }
const Task = require('./schema')

const addTask = async (req, res) => {
  try {
    // Check if a task with the same name and deadline already exists
    const existingTask = await Task.findOne({
      name: req.body.name,
      deadline: req.body.deadline,
    })

    if (existingTask) {
      return res.status(409).json({
        status: 'fail',
        message: 'Task with this name and deadline already exists',
      })
    }

    const data = new Task({
      name: req.body.name,
      deadline: req.body.deadline,
      description: req.body.des || ' ',
    })
    await data.save()

    res.status(200).json({
      status: 'success',
      message: data,
    })
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong: ' + e.message,
    })
  }
}

const updateTask = async (req, res) => {
  try {
    const id = req.params.id

    const data = await Task.findByIdAndUpdate(id, req.body, { new: true })

    if (!data) {
      return res.status(404).json({
        status: false,
        message: 'Task not found with this ID',
      })
    }

    res.status(200).json({
      status: true,
      message: 'Updated successfully',
      updatedTask: data, // send updated task data separately
    })
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong: ' + e.message,
    })
  }
}

const removeTask = async (req, res) => {
  try {
    const id = req.params.id

    const deletedTask = await Task.findByIdAndDelete(id)

    if (!deletedTask) {
      return res.status(404).json({
        status: false,
        message: 'Task not found with this ID',
      })
    }

    res.status(200).json({
      status: true,
      message: 'Task deleted successfully',
      deletedTask, // optional: return deleted data
    })
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong: ' + e.message,
    })
  }
}
const displayTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json({
      status: true,
      data: tasks,
    })
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong: ' + e.message,
    })
  }
}

const finishTask = async (req, res) => {
  try {
    const id = req.params.id
    const task = await Task.findByIdAndUpdate(
      id,
      { status: 'finished' },
      { new: true }
    )

    if (!task) {
      return res.status(404).json({
        status: false,
        message: 'Task not found',
      })
    }

    res.json({
      status: true,
      message: 'Marked as completed',
      data: task,
    })
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong: ' + e.message,
    })
  }
}

const displayFinishedTasks = async (req, res) => {
  try {
    const data = await Task.find({ status: 'finished' })
    res.json({
      status: true,
      data,
    })
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong: ' + e.message,
    })
  }
}

const displayPendingTasks = async (req, res) => {
  try {
    const data = await Task.find({ status: 'pending' })
    res.json({
      status: true,
      data,
    })
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong: ' + e.message,
    })
  }
}

module.exports = {
  addTask,
  updateTask,
  removeTask,
  displayTasks,
  finishTask,
  displayFinishedTasks,
  displayPendingTasks,
}
