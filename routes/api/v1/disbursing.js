// Import the Express.js framework
const express = require("express");

// Create a new Express Router
const router = express.Router();

// Import the "disbursing" controller from "../../../controllers/api/v1/disbursing"
const disbursingApi = require("../../../controllers/api/v1/disbursing");

// Define a GET route at the root path ("/") that is handled by the "disbursing" function from the "disbursingApi" controller
router.get("/", disbursingApi.disbursing);

// Export the router, making it available for use in other parts of the application
module.exports = router;
