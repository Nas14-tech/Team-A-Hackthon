// config.js - Configuration file for the web app

module.exports = {
  // MongoDB connection URI
  mongoURI: "mongodb://localhost:27017/webapp_database",

  // Secret key for JWT authentication
  jwtSecret: "your_jwt_secret_key",

  // Port number for the server
  port: process.env.PORT || 3000,
}
