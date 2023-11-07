const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator')

const driverSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address'
        }
    },
    password: String,
    firstName: String,
    lastName: String,
    status : String,
    tasksAssigned : Number
}, { collection: 'drivers' });

const driverModel = mongoose.model('driverModel', driverSchema);
module.exports = driverModel;
