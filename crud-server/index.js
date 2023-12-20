require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json()); // Parse JSON bodies

const jwtValidate = async (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];

        const response = await axios.get(`${process.env.SERVER_URL}/validate`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.error) {
            return res.status(401).json({ message: response.data.message });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Erroreee' });
    }
}

// Routes
app.use('/api/user', jwtValidate, require('./src/routes/user.routes'));

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
