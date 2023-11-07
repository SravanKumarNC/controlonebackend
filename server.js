// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const forkliftRoutes = require('./routes/forklift');
const clientRoutes = require('./routes/client');
const taskRoutes = require('./routes/tasks');
const driverRoutes = require('./routes/driver');


// Connecting to MongoDB
mongoose.connect('mongodb+srv://sudusudevku:Ernesto60@controlonecluster.amfafgu.mongodb.net/ControlOneDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});



const app = express();
const port = 4000;
app.use(cors());
// Middleware
app.use(express.json());
app.use(forkliftRoutes)
app.use(clientRoutes)
app.use(taskRoutes)
app.use(driverRoutes)  
// Defining routes
app.get('/', (req, res) => {
  res.setHeaders('Access-Control-Allow-Credentials',"true");
  res.send('Welcome to the backend server!');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
