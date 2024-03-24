// FlutterWaveRoutes.js - Routes for handling FlutterWave payments

const express = require("express")
const router = express.Router()
const FlutterWaveAPI = require("../utils/FlutterWaveAPI")

// Route to initiate payment
router.post("/payment", async (req, res) => {
  try {
    const { amount, currency, email, metadata } = req.body
    const paymentData = await FlutterWaveAPI.initiatePayment(
      amount,
      currency,
      email,
      metadata
    )
    res.json(paymentData)
  } catch (error) {
    console.error("Error initiating payment:", error.message)
    res.status(500).json({ error: "Failed to initiate payment" })
  }
})

module.exports = router
