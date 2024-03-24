// feedbackController.js

// Function to submit feedback
exports.submitFeedback = (req, res) => {
  try {
    const { name, email, message } = req.body
    // Add logic here to save feedback to database or perform other actions
    console.log("Feedback submitted:", { name, email, message })
    res
      .status(200)
      .json({ success: true, message: "Feedback submitted successfully" })
  } catch (error) {
    console.error("Error submitting feedback:", error)
    res
      .status(500)
      .json({ success: false, message: "Failed to submit feedback" })
  }
}
