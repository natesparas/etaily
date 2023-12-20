require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', require('./src/routes/auth.routes'));

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
