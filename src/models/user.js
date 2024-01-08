const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Task = require("./tasks")


const userSchema = new mongoose.Schema({
    name: {
         type: String,
         required : true,
         trim : true,
    },
    email:{
          type : String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true,
          validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address!");
          }
          
    }},
    age: {
         type: Number,
         validate(value){
            if(value<0){
                throw new Error("Age must be positive number!");
            }
         }
    },
    password: {
        required: true,
        type: String,
        minlength: 7,
        validate(value) {
            
            if(value.toLowerCase().includes("password")){
                throw new Error("Password should not be 'password' ")
            }
        },
        trim :true,
        
    },
    tokens:[{
      authToken: {
        type : String,
        required : true,

      }
    }],
    avatar:{            //pfp
      type: Buffer   
      }
}, {
  timestamps:true
})

//Defined methods
userSchema.statics.findByCreds = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
      throw new Error('Unable to login')
    }
    let validPass = await bcrypt.compare(password, user.password)
    
    if(!validPass){
      throw new Error('Wrong Password!')
    }
    return user

}


userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString() }, "abd the goat");
  user.tokens.push({ authToken: token });
  await user.save();
  return token;
}


//TO HIDE PASSWORDS N OTHER STUFFS
userSchema.methods.toJSON = function(){
  const user = this;
  
  const userObject = user.toObject()
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar
  console.log(userObject);
  return userObject
}
userSchema.pre('save', async function(next){
      const user = this;
      //console.log('before saving');
      if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
      }
      
      

      next()
})

userSchema.virtual("tasks", {
  ref : Task,
  localField: '_id',
  foreignField : 'author'
 
})


//DELETE TASKS OF DELETED USER
userSchema.pre("remove", async function (next) {
  const user = this;
  console.log(`Removing tasks for user ${user._id}`);
  await Task.deleteMany({ author: user._id });
  console.log('tasks deleted');
  next();
});


const User = mongoose.model('user', userSchema);
    
    // const user1 = new User({
    //     name: "abd2",
    //     age: 39,
    //     email : "abd@gmail.com    ",
    //     password: "Pard"
    // });
    
    // user1.save().then((result) => {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // });

    module.exports = User