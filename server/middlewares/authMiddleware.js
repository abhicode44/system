const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

exports.validateRegistration = (req, res, next) => {
    const { username, password, role, adminSecretKey } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role selected' });
    }

    // If role is admin, check for the security key
    if (role === 'admin') {
        if (!adminSecretKey || adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ message: 'Invalid admin secret key' });
        }
    }

    next();
};

exports.validateLogin = (req, res, next) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role selected' });
    }
    next();
};

// Middleware to protect routes
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token == null) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
