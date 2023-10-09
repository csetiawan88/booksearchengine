// Import necessary modules and components
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client"; // Apollo Client for handling GraphQL mutations
import { ADD_USER } from "../utils/mutations"; // Importing GraphQL mutation for user registration
import Auth from "../utils/auth"; // Importing authentication utility functions

// Define the SignupForm component
const SignupForm = () => {
  // Set the initial form state using useState hook
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Define a GraphQL mutation for adding a new user using the useMutation hook
  const [addUser, { error }] = useMutation(ADD_USER);

  // Set state for form validation
  const [validated] = useState(false);

  // Set state for displaying an alert message
  const [showAlert, setShowAlert] = useState(false);

  // Handle changes in form input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the userFormData state with the new input value
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if the form is valid according to React Bootstrap's validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Call the addUser mutation with userFormData variables
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      console.log(data);

      // If successful registration, store the user's token in local storage and log them in
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true); // Display an error alert if registration fails
    }

    // Clear the form input fields
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  // Render the signup form component
  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Display an alert if showAlert state is true */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        {/* Username input field */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email input field */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
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
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm; // Export the SignupForm component
