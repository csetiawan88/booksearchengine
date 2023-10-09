// Import necessary modules and components
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm"; // Import the SignUpForm component
import LoginForm from "./LoginForm"; // Import the LoginForm component
import Auth from "../utils/auth"; // Import authentication utility functions

// Define the AppNavbar component
const AppNavbar = () => {
  // Define state to control the display of the modal
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Navbar for the application */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Google Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          {/* Navbar links */}
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
            <Nav className="ml-auto d-flex">
              <Nav.Link as={Link} to="/">
                Search For Books
              </Nav.Link>
              {/* Conditionally render links based on user authentication status */}
              {Auth.loggedIn() ? (
                // If the user is logged in, show saved books and logout links
                <>
                  <Nav.Link as={Link} to="/saved">
                    See Your Books
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                // If the user is not logged in, show a login/signup link
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for login and signup */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* Tab container to toggle between signup and login components */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              {/* Tabs for switching between login and signup */}
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              {/* Tab pane for login component */}
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              {/* Tab pane for signup component */}
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar; // Export the AppNavbar component
