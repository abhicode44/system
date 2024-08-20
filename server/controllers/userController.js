const User = require('../models/User');
const Transaction = require('../models/Transaction');

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
        const { userId } = req.params;

        // Find the user by ID with role "user"
        const user = await User.findOne({ _id: userId, role: 'user' }, 'username role');

        if (!user) {
            return res.status(404).json({ message: 'User not found or not a "user" role' });
        }

        // Fetch all transactions for the user
        const transactions = await Transaction.find({ user: userId });

        if (!transactions.length) {
            return res.status(404).json({ message: 'No transactions found for this user' });
        }

        // Respond with the user's username, role, and their transactions
        res.json({
            username: user.username,
            role: user.role,
            transactions: transactions,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};
