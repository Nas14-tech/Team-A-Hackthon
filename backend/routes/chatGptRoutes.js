// Import required modules
const express = require("express")
const dialogflow = require("dialogflow")

// Create a new router instance
const router = express.Router()

// Route to handle incoming chat messages
router.post("/message", async (req, res) => {
  const { message } = req.body

  try {
    // Get response from Dialogflow
    const botResponse = await getDialogflowResponse(message)

    // Send the response back to the client
    res.json({ message: botResponse })
  } catch (error) {
    console.error("Error processing message:", error)
    res.status(500).json({ error: "Failed to process message" })
  }
})

// Function to get response from Dialogflow
async function getDialogflowResponse(message) {
  // Create a new session client
  const sessionClient = new dialogflow.SessionsClient()

  // Define session path and create session
  const sessionPath = sessionClient.sessionPath(
    "your-project-id",
    "your-session-id"
  )
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "en-US",
      },
    },
  }

  // Send request to Dialogflow and receive responses
  const responses = await sessionClient.detectIntent(request)

  // Extract the first response from Dialogflow
  const botResponse = responses[0].queryResult.fulfillmentText

  return botResponse
}

// Export the router
module.exports = router
