// Import the MongoClient from the "mongodb" package
const { MongoClient } = require("mongodb");

// Replace the "uri" string with your MongoDB connection string.
const uri = "mongodb+srv://assignment:edviron@cluster0.ebxruu8.mongodb.net/";

// Create a new MongoClient instance with the provided connection string
const client = new MongoClient(uri);

// Define an asynchronous function "run" to establish a connection to MongoDB
async function run() {
  try {
    // Attempt to connect to the MongoDB server using the "client" instance
    await client.connect();

    // Log a message to indicate a successful connection to MongoDB
    console.log("Connected to MongoDB");
  } catch (err) {
    // If there is an error during the connection attempt, log the error
    console.log(err);
  }
}

// Call the "run" function to initiate the MongoDB connection
run();

// Export the "client" instance, making it available for use in other parts of the application
module.exports = client;
