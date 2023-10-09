import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql", // This defines the endpoint for GraphQL queries and mutations
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // Attach the token as a Bearer token in the authorization header
    },
  };
});

// Create an instance of Apollo Client with configured links and cache
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // Cache for storing data received from GraphQL queries
});

function App() {
  return (
    // Wrap the entire application with ApolloProvider to provide the Apollo Client instance
    <ApolloProvider client={client}>
      <Router>
        <>
          {/* Display a navigation bar at the top of the page */}
          <Navbar />
          {/* Define routes for different pages */}
          <Routes>
            <Route
              path="/"
              element={<SearchBooks />} // Render the SearchBooks component when the path is '/'
            />
            <Route
              path="/saved"
              element={<SavedBooks />} // Render the SavedBooks component when the path is '/saved'
            />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>} // Render a message for wrong paths
            />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
