// Import necessary modules and styles
import ReactDOM from "react-dom/client"; // Import ReactDOM from the 'react-dom/client' package
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import routing components from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for styling

// Import React components
import App from "./App.jsx";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";

// Create a router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchBooks />,
      },
      {
        path: "/saved",
        element: <SavedBooks />,
      },
    ],
  },
]);

// Create a root element and render the RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
