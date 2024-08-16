const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get all users with the role "user"
router.get('/usersList', userController.getAllUsers);

router.get('/usersList', (req, res) => {
    console.log('Route /usersList hit'); // Debugging statement
    userController.getAllUsers(req, res);
});

module.exports = router;
