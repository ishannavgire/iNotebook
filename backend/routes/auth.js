const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a User using: POST "/api/auth/createuser". No login required.
router.post("/createuser", [body("name", "Name must be atleast 3 characters").isLength({ min: 3 }), body("email", "Enter valid email address").isEmail(), body("password", "Password must be atleast 8 characters").isLength({ min: 8 })], async (req, res) => {
  // Finds the validation errors in this request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //Check user with email already exists in database
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json(`{ error: "User with email ${req.body.email} already exists." }`);
    }
    //Create new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      date: req.body.date,
    });
    return res.status(201).json(`{ Message: user ${req.body.name} successfully created.}`);
  } catch (error) {
    return res.status(500).json(`{ error: ${error} }`);
  }
});

module.exports = router;
