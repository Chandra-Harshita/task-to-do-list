const express = require('express')
const {
  displayTasks,
  addTask,
  updateTask,
  removeTask,
  finishTask,
  displayFinishedTasks,
  displayPendingTasks,
} = require('./controller')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)

app.post('/add', addTask)
app.put('/update/:id', updateTask)
app.delete('/remove/:id', removeTask)
app.get('/display', displayTasks)
app.put('/finish/:id', finishTask)
app.get('/display/finished', displayFinishedTasks)
app.get('/display/pending', displayPendingTasks)

app.listen(8000, () => {
  console.log('server is running')
})
