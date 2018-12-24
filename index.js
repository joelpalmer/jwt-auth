const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8888;

app.use(bodyParser.json());

app.get("/time", (req, res) => {
  const time = new Date().toLocaleTimeString();
  res.status(200).send(`The time is ${time}`);
});

// catchall
app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Error. Missing username or password");
    return;
  }
  const user = users.find(u => {
    return u.username === req.body.username && u.password === req.body.password;
  });

  if (user === undefined) {
    res.status(401).send();
  } else {
    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username
      },
      "mykey",
      { expiresIn: "3 hours" }
    );
    res.status(200).send({ access_token: token });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

// move these

const users = [
  { id: 1, username: "liamPalmer", password: "spiderman" },
  { id: 2, username: "bashPalmer", password: "chase" }
];
