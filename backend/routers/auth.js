var express = require("express");
var router = express.Router();
var {signout, register, login, isSignedIn} = require("../controllers/auth");
const {check} = require("express-validator");
const User = require("../models/user");

// ......... routes .........

// create route
router.post(
  "/register",
  [
    check("name")
      .custom(async function (value) {
        var user = await User.find({name: value});
        return user.length == 0;
      })
      .withMessage("already exits"),
  ],
  register
);

router.post("/login", login);

// read route
router.get("/signout", signout);

module.exports = router;
