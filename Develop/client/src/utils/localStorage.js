// Function to retrieve saved book IDs from local storage
export const getSavedBookIds = () => {
  // Attempt to get saved book IDs from local storage; initialize as an empty array if not found
  const savedBookIds = localStorage.getItem("saved_books")
    ? JSON.parse(localStorage.getItem("saved_books"))
    : [];

  return savedBookIds; // Return the array of saved book IDs
};

// Function to save an array of book IDs to local storage
export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    // If the input array is not empty, save it to local storage as a JSON string
    localStorage.setItem("saved_books", JSON.stringify(bookIdArr));
  } else {
    // If the input array is empty, remove the "saved_books" key from local storage
    localStorage.removeItem("saved_books");
  }
};

// Function to remove a specific book ID from the saved book IDs in local storage
export const removeBookId = (bookId) => {
  // Attempt to get saved book IDs from local storage; initialize as null if not found
  const savedBookIds = localStorage.getItem("saved_books")
    ? JSON.parse(localStorage.getItem("saved_books"))
    : null;

  if (!savedBookIds) {
    return false; // Return false if no saved book IDs are found in local storage
  }

  // Filter out the specified book ID from the saved book IDs array
  const updatedSavedBookIds = savedBookIds?.filter(
    (savedBookId) => savedBookId !== bookId
  );

  // Update the saved book IDs in local storage with the filtered array
  localStorage.setItem("saved_books", JSON.stringify(updatedSavedBookIds));

  return true; // Return true to indicate successful removal
};
