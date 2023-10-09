// Import required modules
const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require("../../controllers/user-controller");

// Import middleware for authentication
const { authMiddleware } = require("../../utils/auth");

// Define routes and specify the HTTP methods and corresponding controller functions
router.route("/").post(createUser).put(authMiddleware, saveBook);

router.route("/login").post(login);

router.route("/me").get(authMiddleware, getSingleUser);

router.route("/books/:bookId").delete(authMiddleware, deleteBook);

// Export the router for use in the application
module.exports = router;
