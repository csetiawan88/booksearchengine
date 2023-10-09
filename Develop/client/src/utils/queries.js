// Import the 'gql' template tag from Apollo Client
import { gql } from "@apollo/client";

// GraphQL query to fetch user information (the currently logged-in user)
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
