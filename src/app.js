const express = require('express')
require('./DB/mongoose.js')

const userRouter = require("./routers/userouter")
const taskRouter = require("./routers/taskrouter")



const app = express()

const port = process.env.PORT 

app.use(express.json())       //to parse incoming req as JSON
app.use(userRouter)
app.use(taskRouter)





module.exports = app