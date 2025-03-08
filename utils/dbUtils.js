const { pool } = require("../config/connectToDb")

const createTable = async () => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS schools(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(200) NOT NULL,
                    address VARCHAR(200) NOT NULL,
                    latitude FLOAT NOT NULL,
                    longitude FLOAT NOT NULL
                )
            `    
        )
        console.log('Table schools created successfully!');
    } catch (error) {
        console.log('Error creating table:', error);
    }
}

module.exports = { createTable };