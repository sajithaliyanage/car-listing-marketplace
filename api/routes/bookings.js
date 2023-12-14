const express = require('express');
const { protect, authorizeAdmin } = require('../middleware/auth');
const { cancelBooking, getBooking, setBooking } = require('../controllers/bookings');

const router = express.Router();

router.route('/').post(protect, setBooking);
router.route('/:referenceNumber').get(protect, getBooking);
router.route('/:referenceNumber').delete(protect, cancelBooking);

module.exports = router;
