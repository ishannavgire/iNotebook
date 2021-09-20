const { json } = require("express");
const express = require("express");
const connecttoMongo = require("./db.js");
const cors = require("cors");

connecttoMongo();
const app = express();
const port = 5000;

app.use(cors());

//Add middleware to work with request
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`);
});
