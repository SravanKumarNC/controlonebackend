const driverModel = require('../models/driverModel');

const createDriver = async (req, res) => {
  try {
    console.log(req.body);
    const newDriver = driverModel(req.body);
    const savedDriver = await newDriver.save();
    res.json(savedDriver);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const getAllDriver = async (req, res) => {
  try {
    const driversData = await driverModel.find();
    res.json(driversData);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};


const updateDriver = async (req, res) => {
    try {
        filter = { username: req.params.username };
        const DriverUpdatedData = await driverModel.findOneAndUpdate(filter, req.body, { new: true });
        if (!DriverUpdatedData) {
            return res.status(404).send('Client Not Found');
        }
        res.json(DriverUpdatedData);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Issue');
    }
};

const getDriverByUsername = async (req, res) => {
    try {
        // neededID = String(req.params.id);
        const driverOne = await driverModel.findOne({ username: req.params.username });
        if (!driverOne) {
            console.log(`Driver with ID ${req.params.id} not found.`);
            return res.status(404).send('Driver Not Found');
        }
        res.json(driverOne);
    } catch (err) {
        console.error('Error fetching driver by ID:', err);
        res.status(500).send('Internal Server Error');
    }
};


const deleteDriver = async (req, res) => {
    try {
        filter = { username: req.params.username };
        const deletedDriver = await driverModel.findOneAndDelete(filter);
        if (!deletedDriver) {
            return res.status(404).send('Client not found');
        }
        res.json(deletedDriver);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllDriver,
    createDriver,
    getDriverByUsername,
    updateDriver,
    deleteDriver,
};
