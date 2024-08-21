const User = require('../models/User');
const Transaction = require('../models/Transaction_model');

// Fetch all users with the role "user"
exports.getAllUsers = async (req, res) => {
    try {
        // Fetch users with role "user" and only include username and role fields
        const users = await User.find({ role: 'user' }, 'username role');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Fetch all transactions for a specific user with their username and role
exports.getUserTransactions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const transactions = await Transaction.find({ user: userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
