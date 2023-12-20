const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION
    })
}

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed)
}

const isTokenExpired = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const currentTimestamp = Math.floor(Date.now() / 1000) // Convert current time to Unix timestamp (in seconds)

        // Compare the "exp" claim with the current timestamp + expiration duration
        return decoded.exp < currentTimestamp
    } catch (error) {
        // If there's an error (e.g., token is invalid or expired), consider it expired
        return { error: true, message: 'Token is invalid' }
    }
}

module.exports = {
    comparePassword,
    signToken,
    isTokenExpired
}