require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: ' This msg is form server' });
})

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));