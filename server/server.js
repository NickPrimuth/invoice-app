const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Import Routes
const apiRoutes = require('./routes/api');

const PORT = process.env.PORT || 5000;

// Handle Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes Handler
app.use('/api', apiRoutes);

// Main app
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'))
);

// Error handler for unknown route
app.use((req, res) => res.sendStatus(404));

// Express errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const error = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, error, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

module.exports = app;
