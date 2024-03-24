// metamaskApiController.js

// Function to check MetaMask installation
exports.checkMetaMaskInstallation = (req, res) => {
  if (typeof window.ethereum !== "undefined") {
    res.send("MetaMask is installed!")
  } else {
    res.send("MetaMask is not installed!")
  }
}

// Function to check MetaMask network
exports.checkMetaMaskNetwork = async (req, res) => {
  try {
    const networkId = await window.ethereum.request({ method: "net_version" })
    console.log("Connected to network with ID:", networkId)
    // Check if network ID matches the desired network (e.g., 1 for mainnet)
    if (networkId !== "1") {
      console.log("Please connect to the Ethereum mainnet for transactions.")
      res
        .status(400)
        .send("Please connect to the Ethereum mainnet for transactions.")
    } else {
      res.send("Connected to Ethereum mainnet!")
    }
  } catch (error) {
    console.error("Error checking MetaMask network:", error)
    res.status(500).send("Error checking MetaMask network")
  }
}

// Function to connect MetaMask
exports.connectMetaMask = async (req, res) => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    const userAccount = accounts[0]
    console.log("Connected with MetaMask. User account:", userAccount)
    // Call your server's route to handle MetaMask connection if necessary
    res.send(`Connected with MetaMask. User account: ${userAccount}`)
  } catch (error) {
    console.error("Error connecting with MetaMask:", error)
    res.status(500).send("Error connecting with MetaMask")
  }
}

// Function to initiate Ethereum transaction
exports.initiateTransaction = async (req, res) => {
  try {
    // Check if MetaMask is installed and connected
    if (typeof window.ethereum === "undefined") {
      return res.status(400).send("MetaMask is not installed!")
    }

    const recipientAddress = req.body.to
    const amount = req.body.amount

    // Check MetaMask network
    const networkId = await window.ethereum.request({ method: "net_version" })
    if (networkId !== "1") {
      return res
        .status(400)
        .send("Please connect to the Ethereum mainnet for transactions.")
    }

    // Initiate transaction
    const response = await fetch("/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: recipientAddress, amount: amount }),
    })
    const data = await response.json()
    console.log("Transaction initiated:", data)
    res.send(data)
  } catch (error) {
    console.error("Error initiating transaction:", error)
    res.status(500).send("Error initiating transaction")
  }
}
