const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = mongoose.Schema({
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
    FirstName: String,
    LastName: String,
    role: String
}, { collection: 'client' });

const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;
