// FlutterWaveAPI.js - Integration with FlutterWave Payment API

const fetch = require("node-fetch");
const config = require("./config");

const FLUTTERWAVE_SECRET_KEY = config.flutterwaveSecretKey;

/**
 * Function to initiate payment with FlutterWave
 * @param {number} amount - The amount to be paid
 * @param {string} currency - The currency code (e.g., "USD", "NGN")
 * @param {string} email - The customer's email address
 * @param {object} metadata - Additional metadata for the payment
 * @returns {Promise<object>} - Promise resolving to payment data from FlutterWave
 */
async function initiatePayment(amount, currency, email, metadata) {
  try {
    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`
      },
      body: JSON.stringify({
        tx_ref: generateTransactionReference(),
        amount,
        currency,
        payment_options: "card",
        redirect_url: config.flutterwaveRedirectURL,
        meta: metadata,
        customer: { email },
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to initiate payment");
    }
    const paymentData = await response.json();
    return paymentData;
  } catch (error) {
    console.error("Error initiating payment:", error.message);
    throw new Error("Failed to initiate payment");
  }
}

/**
 * Function to generate a unique transaction reference
 * @returns {string} - Unique transaction reference
 */
function generateTransactionReference() {
  return `TX-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

module.exports = { initiatePayment };
