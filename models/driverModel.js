const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator')

const driverSchema = mongoose.Schema({
    id:{
        type:String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        unique: true,
        required: true,
    },

    firstName: String,
    lastName: String,
    status : String,
    tasksAssigned : Number,
    tasksCompleted : Number,
    tasksPending : Number,
    driverAvailability: String,
    acceptStatus:Boolean,
    assign:{
        type:Number,
        default:0,
    },
    VideoPlayer:Boolean
}, { collection: 'drivers' });

const driverModel = mongoose.model('driverModel', driverSchema);
module.exports = driverModel;
