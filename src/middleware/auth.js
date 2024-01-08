const jwt = require("jsonwebtoken");
const User = require('../models/user');

const auth = async (req, res, next) => {
   try {
     const token = req.header("Authorization").replace('Bearer ', '');
     const decoded = jwt.verify(token, "abd the goat", { expiresIn: '1h' });
     
    
     const user = await User.findOne({ _id: decoded._id });

     if (!user) {
        throw new Error();
     }
      
     req.user = user;
     req.token = token;  // Optionally, you can store the token in the request for later use
     next();
   } catch (error) {
       res.status(401).send("Please authenticate again");
   }
};
 
module.exports = auth;
