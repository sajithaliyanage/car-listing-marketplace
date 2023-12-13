const express = require('express');
const { signup, signout, signin } = require('../controllers/auth');

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/signout', signout);

module.exports = router;
