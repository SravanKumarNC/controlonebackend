const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://0.0.0.0:27017/crud')

const UserSchema = mongoose.Schema({
    name: String,
    age: Number
})

const UserModel = mongoose.model("users",UserSchema)

app.get("/getUsers", (req,res) => {
    req.json(UserModel.find())
})

app.listen(3001, () => {
    console.log("server is running successfully")
})

 