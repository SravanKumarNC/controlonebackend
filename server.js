const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const forkliftRoutes = require('./routes/forklift');
const clientRoutes = require('./routes/client');
const taskRoutes = require('./routes/tasks');
const driverRoutes = require('./routes/driver');
const awsRouter = require('./routes/aws')
require('dotenv').config();

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

// Middleware setup
app.use(
  cors({
    origin: ['https://control-one.onrender.com','http://localhost:3000','https://control-one-driver2.onrender.com','https://control-one-d.onrender.com','http://localhost:3001','http://controlone-dashboard.com.s3-website-us-west-2.amazonaws.com'],
    methods: ["GET", "POST","PUT"],
    credentials: true // Enable credentials (cookies, authorization headers)
  })
);

app.use(express.json());



// Define routes
app.use(forkliftRoutes);
app.use(clientRoutes);
app.use(taskRoutes);
app.use(driverRoutes);
app.use(awsRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


