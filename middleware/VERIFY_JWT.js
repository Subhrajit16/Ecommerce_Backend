const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access', success: false });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized access', error, success: false });
    }
}

module.exports = verifyToken;