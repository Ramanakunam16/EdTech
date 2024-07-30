const express = require("express");
const app = express();
const cors = require("cors");

const config = require("./utils/config");
const cookieParser = require("cookie-parser");

const user = require("./routes/user");
const auth = require("./routes/auth");
const courses = require("./routes/courses");

const DBconnection = require("./startup/dbConnection");
DBconnection();

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());
app.use(cookieParser());

app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/courses", courses);

app.listen(config.PORT, () => {
  console.log(`app lisenting on ${config.PORT}`);
});
