const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {signup, signin, signout, showLoginPage, showSignupPage, ensureAuthenticated } = require("../controllers/auth");

router.get("/login", showLoginPage)

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.get("/signup", showSignupPage)

router.post(
  "/signup",
  [
    check("firstName", "Name should be at least 3 char").isLength({ min: 1 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.get("/signout", ensureAuthenticated,signout);

module.exports = router;