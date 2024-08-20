const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Route to get all users with the role "user"
router.get('/users', userController.getAllUsers);

// Route to get transactions for a specific user by their ID
router.get('/users/:userId/transactions', userController.getUserTransactions);

module.exports = router;
