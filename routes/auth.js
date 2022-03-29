/*
Rutas de usuarios / auth
host + /api/auth
*/

const express = require("express");
const { check } = require("express-validator");
const { fieldsValidator } = require("../middlewares/fieldsValidator");
const { login, register, validateToken } = require("../controllers/auth");
const { jwtValidator } = require("../middlewares/jwtValidator");
const router = express.Router();

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "The password must have more than 6 characters").isLength({ min: 6 }),
    fieldsValidator,
  ],
  login
);
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "The password must have more than 6 characters").isLength({ min: 6 }),
    fieldsValidator,
  ],
  register
);
router.get("/renew", jwtValidator, validateToken);

module.exports = router;
