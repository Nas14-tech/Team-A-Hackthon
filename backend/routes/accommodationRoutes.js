// accommodationRoutes.js

const express = require("express")
const router = express.Router()
const accommodationController = require("../controllers/accommodationController")

// Route to get available hostels for ballot
router.get("/hostels", accommodationController.getHostelsForBallot)

// Route to book a hostel
router.post(
  "/book/:hostelType/:hostelNumber/:roomNumber",
  accommodationController.bookHostel
)

// Route to get all accommodations
router.get("/accommodations", accommodationController.getAllAccommodations)

// Route to get accommodation details by ID
router.get("/accommodations/:id", accommodationController.getAccommodationById)

// Route to book an accommodation
router.post(
  "/accommodations/:id/book",
  accommodationController.bookAccommodation
)

// Route to cancel booking of an accommodation
router.post(
  "/accommodations/:id/cancel-booking",
  accommodationController.cancelBooking
)

module.exports = router
