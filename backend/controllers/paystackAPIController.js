// Paystack API routes
const express = require("express")
const router = express.Router()

// Example JavaScript for Paystack Integration
const paystack = require("paystack")("YOUR_SECRET_KEY")

//transaction
paystack.transaction
  .initialize({
    amount: 10000,
    email: "test@example.com",
  })
  .then((response) => {
    // Redirect user to payment page
  })
  .catch((error) => {
    // Handle error
  })

module.exports = router
