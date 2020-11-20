var express = require("express");
var router = express.Router();
var {
  signout,
  register,
  login,
  isSignedIn,
  saveScore,
  loadLeaderboard,
  loadUserInfo,
} = require("../controllers");
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
    check("password")
      .isLength({min: 8})
      .withMessage(
        "should contain a capital letter, a number\nand should be 8 chars long"
      )
      .matches(/[A-Z]+/)
      .withMessage(
        "should contain a capital letter, a number\nand should be 8 chars long"
      ),
  ],
  register
);

router.post("/login", login);

router.post("/score/save", saveScore);
router.post("/userinfo", loadUserInfo);

// read route
router.get("/signout", signout);

router.get("/leaderboard", loadLeaderboard);

module.exports = router;
