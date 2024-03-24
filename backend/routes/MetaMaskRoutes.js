// MetaMaskRoutes.js

const express = require("express")
const router = express.Router()
const metaMaskController = require("../controllers/MetaMaskController")

// Route to check MetaMask installation
router.get("/check-installation", metaMaskController.checkMetaMaskInstallation)

// Route to check MetaMask network
router.get("/check-network", metaMaskController.checkMetaMaskNetwork)

// Route to connect MetaMask
router.post("/connect", metaMaskController.connectMetaMask)

// Route to initiate Ethereum transaction
router.post("/transaction", metaMaskController.initiateTransaction)

module.exports = router
