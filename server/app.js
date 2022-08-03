const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const jwt = require('jsonwebtoken');
SECRET = process.env.SECRET_KEY || "RESTAPI" 

const app = express(); 
require("dotenv").config()
app.use(express.json())

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const loginRoutes = require("./routes/login")
const registerRoutes = require("./routes/register")
const orderRoutes = require("./routes/orders")
const userRoutes = require("./routes/user")


mongoose.connect('mongodb+srv://sahithi:priya@laundry.n9viv5s.mongodb.net/laundryapp?retryWrites=true&w=majority')
const PORT = process.env.PORT || 5000

app.use("/orders",(req,res,next)=>{
  var token = req.headers.authorization.split("Bearer ")[1];
  if(!token){
      return res.status(401).json({
          status:"failed",
          message:"token is missing"
      })
  }
  jwt.verify(token,SECRET,function(err,decoded){  // jwt keeps a record of the tokens
      if(err){
          return res.status(401).json({
              status:"failed",
              message:"invalid token"
          })
      }
      else{
          req.user = decoded.data
          next();
      }
  })
})

app.get("/", (req, res) => {
    res.send("project works-3")
})
app.use("/",loginRoutes)
app.use("/",registerRoutes)
app.use("/",orderRoutes)
app.use("/",userRoutes)

app.listen(PORT,()=>{  
    console.log(`Laundry app listening on port ${PORT}`);
})