const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(req, res, next) {
    const token = req.body.token;
    
    if (!token) return res.status(403).json({ error: 'Token not provided' });

    try {
        const decoded = await jwt.verify(token, process.env.secretKey);
        req.user = decoded;
        return res.status(200).json({ message: 'Token successfully verified' });
    } catch (error) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
}

module.exports = { verifyToken };