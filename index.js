//import dotenv for envirement variables
// ** imported variables from .env file when testing **
//this will set the port dinamically for develoment/production
// require('dotenv').config();

//importing server file
const server = require("./api/server");

// we'll read the port from the server environment if it is there
// heroku will have the PORT environment variable set
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
