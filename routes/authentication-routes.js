import express from "express";

// import { body } from "express-validator";

import { userSignup } from "../controllers/authentication/user/user-signup.js";

import { userSignin } from "../controllers/authentication/user/usersignin.js";
const router = express.Router();
//USER SIGN-UP
router.post(
  "/user/signup",
  // [
  //   body("name").trim().not().isEmpty().withMessage("Name is required"),
  //   body("email").isEmail().withMessage("Should be in a valid email format"),
  //   body("phone")
  //     .trim()
  //     .isInt()
  //     .isLength({ min: 6 })
  //     .withMessage("phone number must be an integer"),
  //   body("password")
  //     .trim()
  //     .isLength({ min: 6 })
  //     .withMessage("Minimum 6 characters"),
  // ],
  userSignup
);

//USER LOGIN USING EMAIL + PASSWORD
router.post(
  "/user/signin",
  // [
  //   body("email")
  //     .isEmail()
  //     .normalizeEmail()
  //     .withMessage("Should be in a valid email format"),
  //   body("password")
  //     .trim()
  //     .isLength({ min: 6 })
  //     .withMessage("Minimum 6 characters"),
  // ],
  userSignin
);
export default router;
