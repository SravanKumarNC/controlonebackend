// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


const userSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },

    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    firstName:String,
    lastName:String,
    role: {
        type: String,
        required: true,
        default:'user'
    },
    profilePicture: {
        data: Buffer, // Binary data for the image
        contentType: String // MIME type of the image (e.g., 'image/jpeg', 'image/png')
    }
},{ collection: 'client' });

// Hash the password before saving to the database
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10); // Hash with salt rounds
        this.password = hashedPassword;
        return next();
    } catch (error) { 
        return next(error);
    }
});

// Method to generate JWT token for the user
userSchema.methods.generateAuthToken = function() {
    const secretKey = process.env.JWT_SECRETKEY || '8QLQKS5VXETD0IDZFDVI28MKLLJZS1NR';
    const token = jwt.sign(
        { _id: this._id, username: this.username },
        secretKey, // Replace with a more secure secret key
        { expiresIn: '1h' } // Set expiration time for the token
    );
    return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
