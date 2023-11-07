const express = require('express')
const mongoose = require('mongoose')
const ForkliftSchema = mongoose.Schema({
    id: { type: String, unique: true },
    MachineName: {type:String , require:true},
    //status is  whether the forklift is ON or Off
    status:String,
    batteryStatus: Number,
    camera1:String,
    camera2:String,
    camera3:String,
    brake:String,
    emergencyBrake:String,
    networkStrength:String,
    acceleratorStatus:String,
    steeringStatus:String,
    downLidar:String,
    yawData:String,
    alertForObsteciles:String,
    encode:String,
    range:String,
    pedalValue:String,
    IPAddress: String
},{collection:'equipments'})

const ForkliftModel = mongoose.model('ForkliftModel', ForkliftSchema)
module.exports = ForkliftModel