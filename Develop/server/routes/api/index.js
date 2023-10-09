// Import required modules
const router = require("express").Router();
const userRoutes = require("./user-routes");

// Define routes for users
router.use("/users", userRoutes);

// Export the router for use in the application
module.exports = router;
