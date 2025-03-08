const express = require('express');
const db = require('../config/connectToDb');
const router = express.Router();

// Insert School
router.post('/addSchool', async (req, res) => {
    // get the name address latitude and longitude from request body.
    const { name, address, latitude, longitude } = req.body;
    if(!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'Please provide all the details' });
    }

    // insert the data into school table.
    try {
        const [result] = await db.pool.query(
            `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
            [name, address, latitude, longitude]
        );
        
        // return the response.
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    } catch (error) {
        res.status(500).json(({ message: 'Error adding school', error }));
    }
});

module.exports = router;