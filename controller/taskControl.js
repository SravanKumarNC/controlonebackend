const TaskModel = require('../models/taskModel');

const getTasks = async (req, res) => {
    try {
        const taskData = await TaskModel.find().sort({ id: 1 });
        res.json(taskData);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const createTask = async (req, res) => {
    try {
        const taskData = new TaskModel(req.body);
        const dataInserted = await taskData.save();
        res.json(dataInserted);
    } catch (err) {
        if (err.name === 'MongoServerError') {
            console.log(err);
            res.status(500).send('ID is already taken');
        } else {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    }
};

const getTaskById = async (req, res) => {
    try {
        filter = { id: req.params.id };
        const neededData = await TaskModel.findOne(filter);
        if (!neededData) {
            return res.status(404).send('No Tasks Found');
        }
        res.json(neededData);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const updateTask = async (req, res) => {
    try {
        filter = { id: req.params.id };
        const updatedTask = await TaskModel.findOneAndUpdate(filter, req.body, { new: true });
        console.log(updatedTask);
        if (!updatedTask) {
            return res.status(400).send('No Tasks Found');
        }
        res.json(updatedTask);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const deleteTask = async (req, res) => {
    try {
        filter = { id: req.params.id };
        const deletedTask = await TaskModel.findOneAndDelete(filter);
        if (!deletedTask) {
            return res.status(404).send('No Task Found');
        }
        res.json(deletedTask);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
};
