// Import necessary modules
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

// Define resolvers
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // Check if a user is logged in through context
      if (context.user) {
        // If logged in, retrieve user data without sensitive fields
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-_v -password"
        );
        return userData;
      }
      // If not logged in, throw an authentication error
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // Create a new user with the provided data
      const user = await User.create({ username, email, password });
      // Generate a JWT token for the user
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      if (!user) {
        // If user not found, throw an authentication error
        throw new AuthenticationError("Incorrect email");
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        // If password is incorrect, throw an authentication error
        throw new AuthenticationError("Incorrect credentials");
      }

      // Generate a JWT token for the user
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      // Check if a user is logged in through context
      if (context.user) {
        // Add the provided book data to the user's savedBooks array
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }
      // If not logged in, throw an authentication error
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, { bookId }, context) => {
      // Check if a user is logged in through context
      if (context.user) {
        // Remove the book with the provided ID from the user's savedBooks array
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      // If not logged in, throw an authentication error
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

// Export the resolvers
module.exports = resolvers;
