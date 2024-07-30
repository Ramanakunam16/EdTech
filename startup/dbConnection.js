const mongoose = require("mongoose");
const config = require("../utils/config");

const url = `mongodb+srv://ramanakunam16:${config.MONGODB_PASSWORD}@cluster0.q0virzs.mongodb.net/edtech`;

async function connection() {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("succesfully connected to mongoDB");
    })
    .catch((ex) => {
      console.log(ex);
    });
}

module.exports = connection;
