const express = require('express');
const app = express();
const cors = require('cors');

//Importing routes
const games = require('./routes/games');
const users = require('./routes/users');

//Middleware
const dbConnect = require('./middleware/dbConnect'); // Connection to the db
const errorHandler = require('./middleware/errorHandler');
app.use(express.json()); //middleware to parse JSON bodies
app.use(cors()); //enable cross-origin sharing for all routes

dbConnect(); // Connect to DB

// Serving routes
app.use('/games', games);
app.use('/users', users);


app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandler); //Error handler middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
