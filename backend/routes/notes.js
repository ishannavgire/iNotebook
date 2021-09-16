const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

//ROUTE 1: Get all Notes using: GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Please authenticate using a valid token." });
  }
});

//ROUTE 2: Add a note using: POST "/api/notes/addnote". Login required.
router.post("/addnote", fetchuser, [body("title", "Title must be atleast 3 characters").isLength({ min: 3 }), body("description", "Description must be atleast 5 characters").isLength({ min: 5 })], async (req, res) => {
  // Finds the validation errors in this request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, tag } = req.body;

    note = await Notes.create({
      title: title,
      description: description,
      tag: tag,
      user: req.user.id,
    });
    res.json(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
