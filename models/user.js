const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
  },
  password: { type: String, required: true },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });
  return token;
};
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(12).max(255).required(),
    passwordConfirmation: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "password did not match.",
        "any.required": "Confirm password is a required field.",
      }),
  });
  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUser };
