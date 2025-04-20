
const jwt = require('jsonwebtoken');

const authMiddleware = (roles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Ensure user details are attached to req.user

            if (Array.isArray(roles)) {
                if (!roles.includes(decoded.role)) {
                    return res.status(403).json({ message: 'Access denied' });
                }
            } else {
                if (decoded.role !== roles) {
                    return res.status(403).json({ message: 'Access denied' });
                }
            }

            next();
        } catch (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    };
};

module.exports = authMiddleware;
