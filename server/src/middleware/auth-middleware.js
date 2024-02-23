const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization;
        console.log(token);

        if (!token) {
            return res.status(403).json({ error: 'Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.secretKey);
        req.user = decoded;
        console.log(req.user.token)
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
}

module.exports = { verifyToken };