// Import the Express.js framework
const express = require("express");

// Create a new Express Router
const router = express.Router();

// Import the "reconciling" controller from "../../../controllers/api/v1/reconciling"
const reconcilingApi = require("../../../controllers/api/v1/reconciling");

// Define a GET route at the root path ("/") that is handled by the "reconciling" function from the "reconcilingApi" controller
router.get("/", reconcilingApi.reconciling);

// Export the router, making it available for use in other parts of the application
module.exports = router;
