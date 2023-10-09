// Import necessary modules and components
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client"; // Apollo Client for handling GraphQL mutations
import { LOGIN_USER } from "../utils/mutations"; // Importing GraphQL mutation
import Auth from "../utils/auth"; // Importing authentication utility functions

// Define the LoginForm component
const LoginForm = () => {
  // Initialize state variables using the useState hook
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false); // Validation state for the form
  const [showAlert, setShowAlert] = useState(false); // State for displaying login error alerts

  // Define a GraphQL mutation for user login using the useMutation hook
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  // Handle changes in form input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the userFormData state with the new input value
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check form validation using React Bootstrap's validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Call the loginUser mutation with userFormData variables
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      console.log(data);

      // If successful login, store the user's token in local storage
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true); // Display an error alert if login fails
    }

    // Clear the form input fields
    setUserFormData({
      username: "", // Assuming there is a username field in the state
      email: "",
      password: "",
    });
  };

  // Render the login form component
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Display an alert if showAlert state is true */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        {/* Email input field */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>
        {/* Password input field */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        {/* Submit button */}
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm; // Export the LoginForm component for use in other parts of the application
