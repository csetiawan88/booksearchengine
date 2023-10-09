// Import the 'decode' function from the 'jwt-decode' library to decode JWT tokens
import decode from "jwt-decode";

// Create a new class to instantiate for managing user authentication
class AuthService {
  // Method to get user data from the token
  getProfile() {
    // Decode the token and return its contents (user information)
    return decode(this.getToken());
  }

  // Method to check if the user is logged in
  loggedIn() {
    // Checks if there is a saved token and if it's still valid (not expired)
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Returns 'true' if both conditions are met
  }

  // Method to check if a token is expired
  isTokenExpired(token) {
    try {
      // Decode the token
      const decoded = decode(token);
      // Check if the token's expiration time is in the past (token is expired)
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false; // Token is not expired
      }
    } catch (err) {
      return false; // Token is not expired if there's an error decoding it
    }
  }

  // Method to retrieve the user token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Method to save a user's token to localStorage
  login(idToken) {
    // Save the user token to localStorage
    localStorage.setItem("id_token", idToken);
    // Redirect the user to the home page (or another desired location)
    window.location.assign("/");
  }

  // Method to log the user out
  logout() {
    // Clear the user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // Reload the page to reset the application's state and return to the home page
    window.location.assign("/");
  }
}

// Export an instance of the AuthService class
export default new AuthService();
