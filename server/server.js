const express = require('express');

const path = require('path');

const app = express();

const bodyParser = require("body-parser");

const router = express.Router();

const port = process.env.PORT || 3000;

const db = require('./models/SqlgModel.js')

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  console.log('12345')
  res.status(200).send()
})

app.get("/signin", (req, res) => { 
  const select = 'SELECT * FROM "public"."account" LIMIT 100';
  db.query(select)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    send(err);
  })
});

app.post("/signin", (req, res) => {
  // console.log(req);
  const username = req.body.username;
  const password = req.body.password;
  const select = 'SELECT * FROM "public"."account" LIMIT 100';
  db.query(select)
  .then(data => {
    if (username === data.rows[0].username && password === data.rows[0].password) {
      console.log('signed in')
    }
    res.status(200).json(data);
  })
  .catch(err => {
    send(err);
  })
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const register = `INSERT INTO account (username, password) VALUES ('${username}', '${password}')`;

  db.query(register)
  .then( data => {
    res.status(200).json(data)
  })
  .catch(err =>
    console.log(err))
});

app.listen(3000);
