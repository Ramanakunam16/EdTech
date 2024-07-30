const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/edtech";

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
