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

// Get all schools
router.get('/listSchools', async (req, res) => {
    // get the user latitude and longitude and longitude from request query
    const { latitude, longitude } = req.query;
    if(!latitude || !longitude) {
        res.status(400).json({ message: `Please provide user's latitude and longitude.` });
    }

    try {
        // fetch all the schools from database and store it in a variable
        const [schools] = await db.pool.query(`SELECT * FROM schools`);
        const userLat = parseFloat(latitude);
        const userLong = parseFloat(longitude);

        // function to calculate the distance between two points
        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Radius of the earth in km
            const dLat = deg2rad(lat2-lat1);  // deg2rad below
            const dLon = deg2rad(lon2-lon1); 
            const a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            const d = R * c; // Distance in km
            return d;
            
            function deg2rad(deg) {
                return deg * (Math.PI/180)
            }
            // NOTE: This function is reference from https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
        }

        // sort the schools based on the distance between user and the school
        const sortedSchools = schools
        .map( (school) => ({
            ...school,
            distance: calculateDistance(userLat, userLong, school.latitude, school.longitude)
        }))
        .sort( (a, b) => a.distance - b.distance );

        console.log(sortedSchools);
        

        // return the list of sorted schools
        res.status(200).json({ schools: sortedSchools });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Error fetching schools', error });
    }
})

module.exports = router;