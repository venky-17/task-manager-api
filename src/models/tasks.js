const mongoose = require("mongoose");
const validator = require("validator")


const taskSchema = new mongoose.Schema({
    desc:{
        type :String ,
        required : true,
         trim : true,

    },
    completed :{
        type : Boolean,
        default:false
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
         ref: 'User'
    }
},{
    timestamps: true
})

const Task = mongoose.model('task', taskSchema)

// const task1 = new Task({
//     desc: "learn docker",

// })

// task1.save().then((task)=>{
//     console.log(task);
// }).catch((err)=>{
//     console.log(err);
// })


module.exports = Task