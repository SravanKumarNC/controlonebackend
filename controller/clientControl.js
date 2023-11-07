const ClientModel = require('../models/clientModel');

const getClients = async (req, res) => {
    try {
        const clientData = await ClientModel.find().collation({locale: "en_US", numericOrdering: true}).sort({ client_id: 1 });
        res.json(clientData);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const createClient = async (req, res) => {
    try {
        const { username, password, FirstName, LastName, role } = req.body;

        const existingUser = await ClientModel.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        const newClient = new ClientModel({ username, password, FirstName, LastName, role });
        const savedClient = await newClient.save();
        res.json(savedClient);
    } catch (err) {
        if (err.name === 'ValidationError') {
            console.log(err);
            return res.status(500).send('Email Invalid');
        }
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const getClientByUsername = async (req, res) => {
    try {
        const oneData = await ClientModel.findOne({ username: req.params.username });
        if (!oneData) {
            return res.status(404).send('Client Not Found');
        }
        res.json(oneData);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const updateClient = async (req, res) => {
    try {
        filter = { username: req.params.username };
        const ClientUpdatedData = await ClientModel.findOneAndUpdate(filter, req.body, { new: true });
        if (!ClientUpdatedData) {
            return res.status(404).send('Client Not Found');
        }
        res.json(ClientUpdatedData);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Issue');
    }
};

const deleteClient = async (req, res) => {
    try {
        filter = { username: req.params.username };
        const deletedClient = await ClientModel.findOneAndDelete(filter);
        if (!deletedClient) {
            return res.status(404).send('Client not found');
        }
        res.json(deletedClient);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getClients,
    createClient,
    getClientByUsername,
    updateClient,
    deleteClient,
};
