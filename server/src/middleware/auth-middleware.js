const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next, returnSuccessMessage = false) {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(403).json({ error: 'Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.secretKey);

        req.alumni = decoded.token

        if (returnSuccessMessage) {
            return res.status(200).json({ message: 'Token verified successfully', auth: true })
        }

        next()
    } catch (error) {
        return res.status(401).json({ error: 'Failed to authenticate token' })
    }
}

module.exports = { verifyToken };