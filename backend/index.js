const express = require('express')
const connecttoMongo = require('./db.js')

connecttoMongo();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello User!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
