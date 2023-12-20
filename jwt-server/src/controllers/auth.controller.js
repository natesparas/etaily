const fs = require('fs/promises');
const jwt = require('jsonwebtoken')
const { signToken, comparePassword, isTokenExpired } = require('../utils/jwt');

const filePath = '../user.json';

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // const user = users.find(user => user.username === username);
        let user = await fs.readFile(filePath, 'utf8');

        if (user.length <= 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        user = JSON.parse(user)

        const userData = user.find(item => item.username === username);
        if (!userData) {
            return res.status(401).json({ message: 'User not found' });
        }

        const match = await comparePassword(password, userData.password)
        if (!match) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const payload = { id: userData.id, username: userData.username }

        const token = signToken(payload)

        const data = {
            user: Object.fromEntries(
                Object.entries(userData).filter(([key]) => key !== 'password')
            ),
            token: token
        }

        return res.json(data);
    } catch (error) {
        return res.json(error)
    }
}

const validateToken = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization || req.headers.Authorization

        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if (authHeader && authHeader?.startsWith('Bearer ')) {
            try {
                // extract token from header string
                token = authHeader.split(' ')[1]

                const isExpired = isTokenExpired(token)

                if (isExpired || isExpired?.error) {
                    const data = {
                        error: true,
                        message: isExpired?.error ? isExpired.message : 'Token Expired'
                    }
                    return res.status(200).json(data)
                }

                return res.status(200).json()
            } catch (error) {

                return res.status(401).json({ message: 'Unauthorized' })
            }
        }
    } catch (error) {
        return res.json(error)
    }
}

module.exports = {
    loginUser,
    validateToken
}