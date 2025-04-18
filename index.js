// const express = require('express')
// const dotenv= require("dotenv")
import express from"express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./route/user.route.js"
import cors from "cors";
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
const PORT=process.env.PORT || 4000;
const URI= process.env.MongoDBURI;
// connect to mongoDB
try{
mongoose.connect(URI,{
  useNewUrlParser:true,
  useUnifiedTopology: true,

});
console.log("connected to mongoDB")
}
catch(error){
console.log("Error",error)
}


app.use("/user", userRoute)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})