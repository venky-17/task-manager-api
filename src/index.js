const express = require("express")
require('./DB/mongoose.js')
const User = require("./models/user")
const Task = require("./models/tasks")
const userRouter = require("./routers/userouter")
const taskRouter = require("./routers/taskrouter")



const app = express()

const port = process.env.PORT 

app.use(express.json())       //to parse incoming req as JSON
app.use(userRouter)
app.use(taskRouter)

app.get('/', (req,res)=>{
      res.send("home")
})



app.listen(port, ()=>{
    console.log('running on port', port);
})  