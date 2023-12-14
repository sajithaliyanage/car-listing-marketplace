const express = require('express');
const { protect, authorizeAdmin } = require('../middleware/auth');
const { addCars, getCars, getCar } = require('../controllers/cars');

const router = express.Router();

router.route('/').post(protect, authorizeAdmin, addCars);
router.route('/').get(protect, getCars);
router.route('/:id').get(protect, getCar);

module.exports = router;
