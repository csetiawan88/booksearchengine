// Import necessary modules and styles
import React from "react"; // Import React library
import ReactDOM from "react-dom"; // Import ReactDOM library for rendering React components
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for styling
import "./index.css"; // Import custom CSS styles
import App from "./App"; // Import the main App component

// Render the React application
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Render the App component inside the HTML element with the id 'root'
);
