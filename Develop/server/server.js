// Import necessary modules and configurations
const express = require("express");
const path = require("path");
const db = require("./config/connection");

// Implement the Apollo Server and apply it to the Express server as middleware
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");

// Import GraphQL type definitions and resolvers
const { typeDefs, resolvers } = require("./schemas");

// Define the port to listen on (defaulting to 3001 if not specified in environment variables)
const PORT = process.env.PORT || 3001;

// Create a new instance of Apollo Server with the provided type definitions, resolvers, and authentication middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Create an Express application
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets if the environment is in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Set up a route to serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Asynchronously start the Apollo Server
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // Once the database connection is open, start listening on the specified port
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();
