require('./src/DB/mongoose')
const User = require('./src/models/user')
const Task = require('./src/models/tasks')


// Task.findByIdAndDelete('658574ba1653420dd81979a6').then((task)=>{
//     console.log(task);
//     return Task.countDocuments({completed:false})
// }).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

const deleteTaskAndCount = async()=>{
    const delTask = await Task.findByIdAndDelete('65859c5edfebc2d13bcdbd22')
    const count = await Task.countDocuments({})
    console.log(`Deleted task is ${delTask} and Count of tasks are ${count}`);
}
deleteTaskAndCount()