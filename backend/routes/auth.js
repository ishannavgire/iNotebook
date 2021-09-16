const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "never$reveal#secret";

//Create a User using: POST "/api/auth/createuser". No login required.
router.post("/createuser", [body("name", "Name must be atleast 3 characters").isLength({ min: 3 }), body("email", "Enter valid email address").isEmail(), body("password", "Password must be atleast 8 characters").isLength({ min: 8 })], async (req, res) => {
  // Finds the validation errors in this request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //Check user with email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json(`{ error: "User with email ${req.body.email} already exists." }`);
    }

    //Create new user with secure password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      date: req.body.date,
    });

    //Generate JWT token
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.status(201).json({ authToken });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

//Authenticate a User using: POST "/api/auth/login". No login required.
router.post("/login", [body("email", "Enter valid email address").isEmail(), body("password", "Password cannot be blank").exists()], async (req, res) => {
  // Finds the validation errors in this request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    //Check user with email already exists
    let user = await User.findOne({ email: email });
    if (!user) {
      console.log(user);
      return res.status(400).json({ error: "Please login with valid credentials." });
    }

    //validate password
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      console.log(passwordCompare);
      return res.status(400).json({ error: "Please login with valid credentials." });
    }

    //Generate JWT token
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.status(200).json({ authToken });
  } catch (error) {
    return res.status(500).json(`{ error: Internal server error.}`);
  }
});

//Get a User using: POST "/api/auth/user". Login required.
router.post("/user", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Please authenticate using a valid token." });
  }
});

module.exports = router;
