require("dotenv").config();
const PORT = process.env.PORT;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

module.exports = { PORT, JWT_PRIVATE_KEY, MONGODB_PASSWORD };
