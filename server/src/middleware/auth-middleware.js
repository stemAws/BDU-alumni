const jwt = require('jsonwebtoken');
const adminservice = require('../services/admin-services');

async function verifyToken(req, res, next) {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(403).json({ error: 'Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.secretKey);

        if (decoded.token.isAdmin) {
            const adminData = await adminservice.fetchAdminDetailsByPersonId(decoded.token.personId);
            req.admin = adminData;
        }
        
        req.alumni = decoded.token;

        next();
    } catch (error) {
        console.error('Failed to authenticate token:', error);
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
}

module.exports = { verifyToken };
