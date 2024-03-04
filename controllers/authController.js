const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

async function toAuthenticate(req, res){
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, password } = req.body;
      const user = User.find(
        (u) => u.name === name && u.password === password
      );
  
      if (user) {
        const token = jwt.sign({ user: user.id }, "secret_key", {
          expiresIn: "10sec",
        });
        res.status(200).json({ message: "Authentication successful!", token });
      } else {
        res.status(401).json({ message: "Authentication failed!" });
      }
    }


module.exports = toAuthenticate