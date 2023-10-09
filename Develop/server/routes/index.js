// Import required modules
const router = require("express").Router();
const path = require("path");
const apiRoutes = require("./api");

// Use the API routes defined in the 'api' folder
router.use("/api", apiRoutes);

// Serve the React front-end in production
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

// Export the router for use in the application
module.exports = router;
