const jwt = require('jsonwebtoken')
const secret = process.env.JWTSECRET

function tokenGenerate(input) {
    console.log(input);
    return jwt.sign(input, secret);
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

module.exports = {tokenGenerate, verifyToken}