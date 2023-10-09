// Import the Mongoose library
const mongoose = require("mongoose");

// Establish a connection to the MongoDB database
mongoose.connect(
  // Use the MONGODB_URI environment variable if it exists; otherwise, default to a local database
  // Mongo DB Atlas: mongodb+srv://csetiawan88:<password>@csetiawan88.inizqqk.mongodb.net/

  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks",
  {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Enable the new MongoDB connection engine
  }
);

// Export the established Mongoose connection to be used in other parts of the application
module.exports = mongoose.connection;
