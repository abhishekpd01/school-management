require('dotenv').config();
const express = require('express');
const { checkConnection } = require('./config/connectToDb');
const { createTable } = require('./utils/dbUtils');
const schoolRoutes = require('./routes/schoolRoutes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to School Management' });
})

// Routes
app.use('/api', schoolRoutes);

app.listen(PORT, async () => {
    console.log(`Server is up and running on port ${PORT}`);
    try {
        await checkConnection();
        await createTable();
    } catch (error) {
        console.log('Failed to initialize DB connection', error);
        
    }
});