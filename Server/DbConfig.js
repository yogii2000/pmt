const {Client} = require('pg');
const client = new Client({
    user: "postgres",
    host: "localhost",
    password: "Yogesh@123",
    port: 5432,
    database: "TimeManagement"
})
module.exports = client;
