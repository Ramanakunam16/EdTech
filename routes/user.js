const express = require("express");
const router = express.Router();

const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    const { error, _ } = validateUser(body);
    if (error) {
      return res.json({ isSignup: false, message: error.details[0].message });
    }

    let user = await User.findOne({ email: body.email });
    if (user)
      return res.json({ isSignup: false, message: "user already exists" });

    user = new User({
      ...body,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.json({ isSignup: true, message: "signup successfull" });
  } catch (ex) {
    res.json({ isSignup: false, moduleessage: ex });
  }
});

module.exports = router;
