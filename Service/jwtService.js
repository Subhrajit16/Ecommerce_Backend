const jwt = require('jsonwebtoken');

async function generateToken(userId, email){
    const token = jwt.sign({userId, email}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
}

async function getUserIdFromToken(token){
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedtoken;
}

module.exports = {generateToken, getUserIdFromToken};