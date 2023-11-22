const ClientModel = require('../models/clientModel');
const driverModel = require("../models/driverModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

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

// const updateClient = async (req, res) => {
//     try {
//       const { username } = req.params;
  
//       let updateFields = { ...req.body };
//       console.log(req.file.buffer)
//       if (req.file) {
//         updateFields.profilePicture = {
//           data: req.file.buffer,
//           contentType: req.file.mimetype
//         };
//       }
  
//       const updatedClient = await ClientModel.findOneAndUpdate({ username }, updateFields, { new: true });
//       if (!updatedClient) {
//         return res.status(404).send('Client not found');
//       }
  
//       res.json(updatedClient);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     }
//   };

const deleteClient = async (req, res) => {
    try {
        filter = { username: req.params.username };
        const deletedClient = await ClientModel.findOneAndDelete(filter);
        if (!deletedClient) {
            return res.status(404).send('Client not found');
        }
        res.json(deletedClient);
        if(deletedClient.role === "driver")
        {
            const deletedDriver = await driverModel.findOneAndDelete(filter);
            console.log(deletedDriver);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};



// const Login = async(req,res) => {
//     const {username,password} = req.body;
//     try
//     {
//         const user = await ClientModel.findOne({ username });
//         if (!user) {
//             console.log('User not found for:', username); // Log if the user is not found
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             console.log('Invalid password for:', username); // Log if the password is invalid
//             return res.status(401).json({ message: 'Invalid password' });
//         }
//         const token = user.generateAuthToken();
//         const responseNeeded = {
//             token:token,
//             data:user
//         }
//         res.status(200).json(responseNeeded);
//         console.log('username : ',responseNeeded.data.username)
//         console.log('role : ',responseNeeded.data.role)
//     } 
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// }

// const Register = async(req,res) => {
//     const { username, password,role } = req.body;
    
//     try 
//     {
//       // Check if the username already exists
//       const existingUser = await ClientModel.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Username already exists' });
//     }
//     var newUser
//     if(!role)
//     {
//         newUser = new ClientModel({username,password})
//         savedUser = await newUser.save();
//     }
//     else
//     {
//         newUser = new ClientModel({username,password,role})
//         savedUser = await newUser.save();
//         if(role === "driver")
//         {
//             id = savedUser.id;
//             const newDriver = new driverModel({username,id});
//             savedDriver = await newDriver.save();
//         }
//     }
//     //   Create a JWT token for the registered user
//     //   const token = newUser.generateAuthToken();
  
//       // Send the token in the response
//     //   res.status(201).json({ token });
//         res.status(201).send('User created');
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   };

//   const logout = async(req,res) => {
    
//   }


module.exports = {
    getClients,
    createClient,
    getClientByUsername,
    updateClient,
    deleteClient
};
