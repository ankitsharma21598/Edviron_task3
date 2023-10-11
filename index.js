// Import the Express.js framework
const express = require("express");

// Define the port number where the server will listen for incoming requests
const port = 5000;

// Create an instance of the Express application
const app = express();

// Use the routes defined in the "./routes" module for all incoming requests to the root path ("/")
app.use("/", require("./routes"));

// Start the server and listen for incoming requests on the specified port
app.listen(port, function (err) {
  // Check if there was an error while starting the server
  if (err) {
    console.log("Error in connecting server");
  }

  // If no error occurred, log a message indicating that the server is running and on which port
  console.log("Server is running in port ", port);
});
