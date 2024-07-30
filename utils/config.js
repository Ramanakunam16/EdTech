require("dotenv").config();
const PORT = process.env.PORT;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

module.exports = { PORT, JWT_PRIVATE_KEY };
