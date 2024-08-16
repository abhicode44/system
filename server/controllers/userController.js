const UserModel = require('../models/User');

// Get all users with the role "user"
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({ role: 'user' })
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
