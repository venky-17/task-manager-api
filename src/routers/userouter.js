const express = require("express")
const router = new express.Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const auth = require('../middleware/auth')
const multer = require("multer")
const path = require("path"); 
const { error } = require("console")

const app = express();


//USERS

// router.post('/users' ,(req,res)=>{

//     const user1 = new User(req.body)
       
//         console.log(req.body);
//      user1.save().then((users) => {
//         res.send(users)
//      }).catch((err) => {
//         res.status(400)
//         res.send(err)
//      });   
// })

//USING ASYNC AWAIT

router.post('/users',  async(req,res)=>{
    const user1 = new User(req.body)
   
        
    
    try {
        await user1.save()
        const token = await user1.generateAuthToken()
        res.status(200).send(user1)
    } catch (error) {
        res.status(400).send(error.message)
        console.log(error.message);
        throw new Error("someting went wrong")
    } 

})


router.post("/users/login", async(req,res)=>{
    try {
        const user = await User.findByCreds(req.body.email, req.body.password )
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//LOGOUT
// userRouter.js
router.post("/users/logout", auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.authToken !== req.token;
      });
  
      await req.user.save();
      res.send("Logged out successfully");
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).send(error);
    }
});


//LOGOUT OF ALL SESSIONS
router.post("/users/logoutall", auth, async(req,res)=>{
    try {
        req.user.tokens=[]
        await req.user.save()
        res.send("logged out of all")
    } catch (error) {
        res.send(error)
    }
})

  
  

//READING ALL USERS

// router.get('/users', (req,res)=>{
//     User.find({}).then((users) => {
//          res.status(200).send(users)
//     }).catch((err) => {
//         res.status(400).send(err)
//     });
// })

//USING ASYNC AWAIT

router.get('/users/me', auth,async(req,res)=>{
    res.send(req.user) 
})


//READING INDIVIDUAL USER

// router.get("/users/:id", (req,res)=>{
//     const id= req.params.id;
//     User.findById(id).then((user) => {
//         res.status(200).send(user)
//     }).catch((err) => {
//         res.status(400).send(err)
//     });
// })

//USING ASYNC AWAIT

// router.get("/users/:id", async(req,res)=>{
//     const id = req.params.id
   
     
    
//     try {
//         const user = await User.findById(id)
//         if(!user){
//             return res.send("no user found")
//         }
//         res.status(200).send(user)
//     } catch (err) {
//         res.status(500).send(err)
//     }

// })


//UPDATE USER DETAILS
router.patch('/users/me', auth,async(req,res)=>{
    const updates = Object.keys(req.body)
      const id = req.user._id;
    try {
     //const user = await User.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
    const user = await User.findById(id)
    updates.forEach((update)=>{
        user[update] = req.body[update]   
    })
    await  user.save()

       if(!user){
        return res.status(404).send("user not found")
       }
       res.status(200).send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

//DELETE USER

router.delete("/users/me", auth, async(req,res)=>{
    const id = req.user._id
    try {
        // const user = await User.findByIdAndDelete(id)
        // if(!user){
        //    return res.status(404).send("user does not exist")
        // }
         
        let deletedUser = await User.deleteOne({_id:id})

        
        
        //console.log(deletedUser);
        
        if(deletedUser){
            res.status(200).send(deletedUser)
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})

//ADDING A PFP

const upload = multer({
    
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        const allowedFileTypes = /jpeg|jpg|png|webp/;
        const extname = allowedFileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = allowedFileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true); // Accept the file
        } else {
            //res.send("file format not supported")
            cb(new Error("file format not supported" , Error.message))
        }
    },
});



router.post("/users/me/avatar", auth, upload.single("upload"), async (req, res) => {
    try {
        if (!req.file || !req.file.buffer.length) {
            return res.status(400).send("Invalid or empty file");
        }

        req.user.avatar = req.file.buffer;
        await req.user.save();
        res.send("pfp uploaded");
    } catch (error) {
        console.error("Error uploading avatar:", error);
        res.status(500).send("Internal Server Error");
    }
});


//DELETING AVATAR


router.delete("/users/me/avatar", auth, async(req,res)=>{
    req.user.avatar = undefined;
    await req.user.save();
    console.log('deleted');
    res.send(req.user)
})

//VIEWING THE AVATAR WHEN AUTH'ED

router.get("/users/avatar/display", auth, async(req,res)=>{
    try {
        //const user = await User.findById(req.params.id)
        const user = req.user
        //console.log(user.name);
         
        if(!user || user.avatar===undefined){
            return res.status(422).json({errors:{msg:"User not found."}})
        }
        res.set("Content-Type", "image/jpeg")
        res.send(user.avatar)

    } catch (error) {
        res.send(error.message)
    }
})


 
router.use((error, req, res, next) => {
    res.status(400).send(error.message);
});
 


module.exports = router