const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
    try {
        // Get the token from the request headers
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed: No token provided' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, 'secret_key');
        const userId = decodedToken.userId;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }

        // Attaching user information to the request for future reference
        req.user = user;
        

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
};

module.exports = isAuthenticated;
