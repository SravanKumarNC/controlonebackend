const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const forkliftRoutes = require('./routes/forklift');
const clientRoutes = require('./routes/client');
const taskRoutes = require('./routes/tasks');
const driverRoutes = require('./routes/driver');
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
    origin: ['https://control-one.onrender.com','http://localhost:3000','https://control-one-driver2.onrender.com'],
    methods: ["GET", "POST","PUT"],
    credentials: true // Enable credentials (cookies, authorization headers)
  })
);

app.use(express.json());

// Configure express-session middleware
// app.use(session({
//   secret: process.env.JWT_SECRETKEY, // Replace with a secure secret key for session encryption
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false, // Set to true if your app is served over HTTPS
//     maxAge: 24 * 60 * 60 * 1000 // Session duration in milliseconds (e.g., 1 day)
//   }
// }));

// Define routes
app.use(forkliftRoutes);
app.use(clientRoutes);
app.use(taskRoutes);
app.use(driverRoutes);
// Route to set session data
// app.get('/set-session', (req, res) => {
//   req.session.user = { username: 'example_user', email: 'user@example.com' };
//   res.send('Session data set successfully');
// });

// // Route to get session data
// app.get('/get-session', (req, res) => {
//   const userData = req.session.user;
//   if (userData) {
//     res.json(userData);
//   } else {
//     res.status(404).send('Session data not found');
//   }
// });

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// process.on('SIGINT', () => {
//   stopPythonScript(() => {
//       process.exit(0);
//   });
// });
