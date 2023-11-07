const express = require('express')
const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    id :{ type :Number, unique:true},
    taskDetail : String,
    Status : Boolean
},{collection:'tasks'})

const TaskModel = mongoose.model('TaskModel',TaskSchema)
module.exports = TaskModel