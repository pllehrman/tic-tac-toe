const express = require('express');
const { Sequelize } = require('sequelize'); // Import Sequelize
const app = express();

// Database connection configuration
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'db',
  database: 'mydatabase',
  username: 'myuser',
  password: 'mypassword',
});

// Helper function to test database connection
const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// // Import your models
// const User = require('./db/models/user')(sequelize, Sequelize.DataTypes);
// const Game = require('./db/models/game')(sequelize, Sequelize.DataTypes);

// // Sync the models with the database
// sequelize.sync()
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch((err) => {
//     console.error('Error synchronizing database:', err);
//   });

testDBConnection(); // Test the connection at startup

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    // Use Sequelize to query the database
    const [results] = await sequelize.query('SELECT NOW()');
    res.send(`HELLO WORLD! Time: ${results[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
