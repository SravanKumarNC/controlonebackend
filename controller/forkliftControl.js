const ForkliftModel = require('../models/forkliftModel');

const createForklift = async (req, res) => {
  try {
    console.log(req.body);
    const newForklift = ForkliftModel(req.body);
    const savedForklift = await newForklift.save();
    res.json(savedForklift);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const getAllForklifts = async (req, res) => {
  try {
    const allData = await ForkliftModel.find();
    res.json(allData);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const getForkliftById = async (req, res) => {
  try {
    const dataOne = await ForkliftModel.findOne({ id: req.params.id });
    if (!dataOne) {
      return res.status(404).send('Forklift Not Found');
    }
    res.json(dataOne);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const updateForklift = async (req, res) => {
  try {
    const filter = { id: req.params.id };
    const updatedData = await ForkliftModel.findOneAndUpdate(filter, req.body, { new: true });
    console.log(updatedData);
    if (!updatedData) {
      return res.status(404).send('Forklift Not Found');
    }
    res.json(updatedData);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

const deleteForklift = async (req, res) => {
  try {
    const filter = { id: req.params.id };
    const deletedData = await ForkliftModel.findOneAndDelete(filter);
    if (!deletedData) {
      return res.status(404).send('Forklift not found');
    }
    res.json(deletedData);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createForklift,
  getAllForklifts,
  getForkliftById,
  updateForklift,
  deleteForklift,
};
