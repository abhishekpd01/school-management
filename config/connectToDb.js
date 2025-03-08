// connect to DB
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 20,
    queueLimit: 10,
    waitForConnections: true
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to DB');
        connection.release();
    } catch (error) {
        console.log('Error connecting to DB:', error);
    }
}

module.exports = { pool, checkConnection };