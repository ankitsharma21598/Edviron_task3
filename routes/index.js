// Import the Express.js framework
const express = require("express");

// Create a new Express Router
const router = express.Router();

// Use routes defined in the "./v1" module for all incoming requests that have a base path of "/v1"
router.use("/v1", require('./api/v1'));

// Export the router, making it available for use in other parts of the application
module.exports = router;
