// Import the CSS file for styling
import "./App.css";

// Import the 'Outlet' component from 'react-router-dom'
import { Outlet } from "react-router-dom";

// Import the 'Navbar' component
import Navbar from "./components/Navbar";

// Define the main 'App' component
function App() {
  return (
    <>
      {/* Render the 'Navbar' component at the top of the page */}
      <Navbar />

      {/* Render the 'Outlet' component, which acts as a placeholder for nested route components */}
      <Outlet />
    </>
  );
}

// Export the 'App' component as the default export
export default App;
