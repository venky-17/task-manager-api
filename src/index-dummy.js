const express = require("express")
require('./DB/mongoose.js')
const User = require("./models/user")
const Task = require("./models/tasks")
const userRouter = require("./routers/userouter")
const taskRouter = require("./routers/taskrouter")


const app = express()

const port = process.env.PORT || 3000  

//MIDDLEWARE
// app.use((req,res, next)=>{
//      if(req.method === "GET"){
//         res.status(500).send("get reqs not alwd")
//      } else{
//         next()
//      }

// })

//MIDDLEWARE EXAMPLE

// app.use((req,res,next)=>{
    
//         res.status(503).send("under maintiance")
    
// })



app.use(express.json())       //to parse incoming req as JSON
app.use(userRouter)
app.use(taskRouter)



app.get('/', (req,res)=>{
      res.send("home")
})

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// const jwtFn = async ()=>{
//    const token = jwt.sign({id : "abc124"}, "", {
//     expiresIn: "2 seconds"
//    })
//    console.log("ur token is",token);
//    const data = jwt.verify(token, "abd the goat")
//    console.log("verified",data);
// }
// jwtFn();


// const bcryptPw= async ()=>{
//     const pass = "abd17venk"
//     const hashedPw = await bcrypt.hash(pass,8)
//     //console.log("hased:"  ,hashedPw);

//     const isMatch = await bcrypt.compare(pass, hashedPw)
//     if(isMatch){
        //console.log('login succesful');
//     } else{
//        // console.log('faield');
//     }

// }
 
// console.log(bcryptPw());

//TASKS
// const readTasks = async()=>{
//     // const task = await Task.findById("658bd8ca0b69b8843050ee2a")
//     // console.log(task.author);

//     const owner = await User.findById("658bd095b0e8cca0de7d0818")
//     await owner.populate('tasks')
    
//     console.log(owner?.tasks);
// }

// readTasks()

// const multer = require("multer")
// const upload =  multer({
//     dest: "images" //forms a folder with this name
// }
// )
// app.post("/upload",upload.single('upload') ,(req,res)=>{
//     res.send()
// })

app.listen(port, ()=>{
    console.log('running on port 3000');
})  