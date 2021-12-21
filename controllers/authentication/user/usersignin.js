//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//models
import User from "../../models/user.js";

//middlware
// import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const userSignin = async (req, res, next) => {
  // validationErrorHandler(req, next);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 403;
      return next(error);
    }
    const isPwdEqual1 = await bcrypt.compare(password, user["password"]);
    if (!isPwdEqual1) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      return next(error);
    }
    const id = user["id"];
    const name = user["name"];
    const mail = user["email"];
    const token = jwt.sign(
      { id, email: mail, name },
      process.env.TOKEN_SIGNING_KEY,
      {
        expiresIn: "1 day",
      }
    );
    console.log(process.env.TOKEN_SIGNING_KEY);
    const refreshToken = jwt.sign(
      {
        id,
        email: mail,
        name,
      },
      process.env.REFRESH_TOKEN_SIGNING_KEY
    );
    await User.update({ refreshToken: refreshToken }, { where: { email } });

    res.status(201).json({
      name,
      email,
      msg: `Login with email Successful`,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
