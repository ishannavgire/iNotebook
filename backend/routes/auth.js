const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a User using: POST "/api/auth/". Doesn't require Auth
router.post("/", [body("name", "Name must be atleast 3 characters").isLength({ min: 3 }), body("email", "Enter valid email address").isEmail(), body("password", "Password must contain atleast one alphabet and number").isAlphanumeric(), body("password", "Password must be atleast 8 characters").isLength({ min: 8 })], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    date: req.body.date,
  })
    .then((user) => res.json(user))
    .catch((error) => {
      res.status(400).json(`{ error: ${error} }`);
    });
});

module.exports = router;
