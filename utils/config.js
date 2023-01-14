require('dotenv').config();

const config = {
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    serverPort: process.env.SERVER_PORT
}

module.exports = config;