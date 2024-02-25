const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(403).json({ error: 'Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.secretKey);
        req.user = decoded;
        next();
        return res.status(200).json({ message: 'Token verified successfully', user: decoded });
    } catch (error) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
}

module.exports = { verifyToken };