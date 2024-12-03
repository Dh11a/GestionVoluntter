require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (username) => {
    console.log("JWT_SECRET value: ", process.env.JWT_SECRET);  
    const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
};

module.exports = { generateToken };
