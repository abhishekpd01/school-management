require('dotenv').config();
const express = require('express');
const { checkConnection } = require('./config/connectToDb');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: ' This msg is form server' });
})

app.listen(PORT, async () => {
    console.log(`Server is up and running on port ${PORT}`);
    try {
        await checkConnection();
    } catch (error) {
        console.log('Failed to initialize DB connection', error);
        
    }
});