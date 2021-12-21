//packages
import bcrypt from "bcryptjs";

//models
import User from "../../models/user.js";

//middlware
// import { validationErrorHandler } from "../../../middleware/validation-error-handler.js";

export const userSignup = async (req, res, next) => {
  // validationErrorHandler(req, next);
  console.log(req.body);
  const { name, email, phone, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const error = new Error("User already exists");
      error.statusCode = 403;
      return next(error);
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name,
      email,
      phone,
      password: encryptedPassword,
      isUser: true,
    });
    res.status(201).json({
      msg: `User registered successfully`,
      result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
