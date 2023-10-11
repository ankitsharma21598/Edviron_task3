// Import the Express.js framework
const express = require("express");

// Create a new Express Router
const router = express.Router();

// Use routes defined in the "./reconciling" module for all incoming requests with the base path "/reconciling"
router.use("/reconciling", require("./reconciling"));

// Use routes defined in the "./disbursing" module for all incoming requests with the base path "/disbursing"
router.use("/disbursing", require("./disbursing"));

// Export the router, making it available for use in other parts of the application
module.exports = router;
