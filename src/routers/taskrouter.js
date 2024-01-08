const express = require("express")
const router = new express.Router()
const Task = require("../models/tasks")
const auth = require("../middleware/auth")



//TASKS

// router.post("/tasks", (req,res)=>{
//     const task1 = new Task(req.body)
//     console.log(req.body);

//     task1.save().then((task) => {
//          res.send(task)
//     }).catch((err) => {
//         res.status(400).send(err)
//     });
// })

//USING ASYNC AWAIT

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
      ...req.body,
      author: req.user._id
    });
  
    try {
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating task');
    }
  });
  


//UPDATE TASKS

router.patch('/tasks/:id', auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const id = req.params.id

    try {
        //const updateTask = await Task.findByIdAndUpdate(id , req.body, {new:true, runValidators:true})
       // const updateTask = await Task.findById(id)
       const updateTask = await Task.findOne({_id: id, author:req.user._id})
       if (!updateTask){
        res.status(404).send("task not found")
    }
        updates.forEach((update)=>{
            updateTask[update] = req.body[update]
             updateTask.save()
        })
        
        
        res.status(200).send(updateTask)
    } catch (error) {
        res.status(400).send(error)
    }
    
})

//DELETE TASKS

router.delete("/tasks/:id", auth,async(req,res)=>{
    const id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id:id, author:req.user._id})
        if(!task){
           return res.status(404).send("task does not exist")
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})


//GET ALL TASKS

// router.get('/tasks', (req,res)=>{
//     Task.find({}).then((tasks) => {
//           res.status(200).send(tasks)
//     }).catch((err) => {
//         res.status(500).send(err)
//     });
// })

//USING ASYNC AWAIT

router.get("/tasks", auth, async (req, res) => {
    const sort = {};

    try {
        const query = { author: req.user._id };

        if (req.query.completed) {
            query.completed = req.query.completed==="true"
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(":");
            sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
        }

        const tasks = await Task.find(query, null, {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort,
        });

        res.status(200).send(tasks);
    } catch (error) {
        res.status(400).send(error);
    }
});




//READING SPECIFIC TASK
// router.get('/tasks/:id', (req,res)=>{
//     const id = req.params.id;
//     Task.findById(id).then((task) => {
//         res.status(200).send(task)
//     }).catch((err) => {
//         res.status(500).send(err)
//     });
// })

//USING ASYNC AWAIT
router.get('tasks/:id', auth, async(req,res)=>{
    const id = req.params.id;

    try {
        //const task = await Task.findById(id)
        const task = await Task.findOne({ _id:id,author:req.user._id})
        if(!task){
            res.status(400).send("no task found")
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router