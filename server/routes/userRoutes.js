const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
const verifyUser = require('../middlewares/verifyid');

// Route to get all users with the role "user"
router.get('/', UserController.getAllUsers);

// Route to get transactions for a specific user by their ID
router.get('/:userId/transactions', verifyUser,  UserController.getUserTransactions);

module.exports = router;

