const express = require('express');
const { protect, authorizeAdmin } = require('../middleware/auth');
const { getUsers, markAsAdmin } = require('../controllers/users');

const router = express.Router();

router.route('/').get(protect, authorizeAdmin, getUsers);
router.route('/:id/mark-as-admin').patch(protect, authorizeAdmin, markAsAdmin);

module.exports = router;
