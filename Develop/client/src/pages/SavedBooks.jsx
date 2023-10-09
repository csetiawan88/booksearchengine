// Import necessary modules and components
import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Auth from "../utils/auth";

import { GET_ME } from "../utils/queries"; // Importing a GraphQL query for fetching user data
import { REMOVE_BOOK } from "../utils/mutations"; // Importing a GraphQL mutation for removing a saved book

import { removeBookId } from "../utils/localStorage"; // Importing a function for removing a book's ID from local storage
import { useQuery, useMutation } from "@apollo/client"; // Apollo Client for handling GraphQL queries and mutations
// import { useQuery, useMutation } from '@apollo/react-hooks'; // Alternative import for Apollo Client

// Define the SavedBooks component
const SavedBooks = () => {
  // Fetch the user data using a GraphQL query
  const { data, loading } = useQuery(GET_ME);
  const userData = data?.me || {};
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Create a function that accepts the book's mongo _id value as a parameter and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Call the removeBook mutation with the bookId variable
      const { data } = await removeBook({
        variables: { bookId },
      });

      // Upon success, remove the book's ID from local storage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // If user data isn't available yet or the data is still loading, display a loading message
  if (!userData || loading) {
    return <h2>LOADING...</h2>;
  }

  // Render the SavedBooks component
  return (
    <>
      {/* Header section */}
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        {/* Display the number of saved books or a message if there are none */}
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {/* Map over each saved book and display its information */}
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {/* Button to delete the book */}
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks; // Export the SavedBooks component
