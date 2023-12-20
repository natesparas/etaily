const fs = require('fs/promises');
// let users = require('../../../user.json');
const { hashPassword } = require('../utils/jwt');

const filePath = '../user.json';

const createUser = async (req, res) => {
    try {
        const { username, firstName, lastName, password } = req.body;

        const hashedPassword = await hashPassword(password)

        const dateAdded = new Date().toISOString(); // Get current date and time in ISO format

        let users = await fs.readFile(filePath, 'utf8');

        const newUser = {
            username,
            firstName,
            lastName,
            password: hashedPassword,
            dateAdded,
        };

        if (users.length > 0) {
            users = JSON.parse(users)
            newUser.id = users.length + 1;
            users.push(newUser);
        } else {
            newUser.id = users.length + 1;
            users = [newUser]
        }

        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8');

        return res.json(newUser)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const listUser = async (req, res) => {
    try {
        const users = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(users)
        return res.json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const users = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(users)

        const userIndex = data.findIndex(item => item.id === userId);
        const isUserFound = data.find(item => item.id === userId);

        if (isUserFound) {
            data[userIndex] = { ...data[userIndex], ...req.body }
            if (req.body.hasOwnProperty("password")) {
                data[userIndex].password = await hashPassword(req.body.password)
            }

            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        } else {
            return res.status(401).json({ message: 'User not found' });
        }

        return res.json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        const users = await fs.readFile(filePath, 'utf8');
        let data = JSON.parse(users)

        const isUserFound = data.find(item => item.id == userId);

        if (isUserFound) {
            data = data.filter(item => item.id !== userId);
        } else {
            return res.status(401).json({ message: 'User not found' });
        }

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        return res.json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    createUser,
    listUser,
    updateUser,
    deleteUser
}