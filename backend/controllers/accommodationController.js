// accommodationController.js

const Accommodation = require("../models/Accommodation")

// Function to get available hostels for ballot
exports.getHostelsForBallot = async (req, res) => {
  try {
    // Add your logic here to fetch available hostels for ballot
    const hostels = await Accommodation.find({ isAvailable: true })
    res.json(hostels)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch available hostels" })
  }
}

// Function to book a hostel
exports.bookHostel = async (req, res) => {
  try {
    // Add your logic here to book a hostel
    const { hostelType, hostelNumber, roomNumber } = req.params
    // Example: You may need to find the specific hostel by type, number, and room number, and update its availability status
    res.json({ message: "Hostel booked successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to book hostel" })
  }
}

// Function to fetch all available accommodations
exports.getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ isAvailable: true })
    res.json(accommodations)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch accommodations" })
  }
}

// Function to get accommodation details by ID
exports.getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id)
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" })
    }
    res.json(accommodation)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch accommodation details" })
  }
}

// Function to book an accommodation
exports.bookAccommodation = async (req, res) => {
  try {
    const accommodationId = req.params.id
    const accommodation = await Accommodation.findById(accommodationId)
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" })
    }
    if (!accommodation.isAvailable) {
      return res
        .status(400)
        .json({ message: "Accommodation is already booked" })
    }
    // Implement logic for booking accommodation
    accommodation.isAvailable = false
    await accommodation.save()
    res.json({ message: "Accommodation booked successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to book accommodation" })
  }
}

// Function to cancel booking of an accommodation
exports.cancelBooking = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id)
    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" })
    }
    if (accommodation.isAvailable) {
      return res
        .status(400)
        .json({ message: "Accommodation is already available" })
    }
    // Implement logic for cancelling booking of accommodation
    accommodation.isAvailable = true
    await accommodation.save()
    res.json({ message: "Booking cancelled successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking" })
  }
}
