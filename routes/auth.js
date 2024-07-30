const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    const { error, _ } = validateUser(body);
    if (error) {
      return res.json({ isSignin: false, message: error.details[0].message });
    }

    let user = await User.findOne({ email: body.email });
    if (!user)
      return res.json({
        isSignin: false,
        message: "User didn`t exits.Please signup ",
      });

    const isValidPassword = await bcrypt.compare(body.password, user.password);
    if (!isValidPassword)
      return res.json({
        isSignin: false,
        message: "invalid email or password",
      });

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.json({ isSignin: true, message: "signin successfull" });
  } catch (ex) {
    res.josn({ isSignin: false, errorMessag: ex });
  }
});

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = router;
