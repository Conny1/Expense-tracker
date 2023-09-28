import { connection } from "../utils/db.js";
import createError from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const logIntoAccount = (req, resp, next) => {
  const query = "SELECT * FROM expensemanager.users WHERE email=?";
  const email = req.body.email;

  connection.query(query, [email], (err, result) => {
    if (err) return next(createError(500, "login server error"));
    if (result?.length === 0)
      return next(createError(404, "account with that email does not exist "));

    const isPassword = bcrypt.compareSync(
      req.body.password,
      result[0].password
    );
    if (!isPassword)
      return next(createError(401, "incorrect email or password"));

    const token = jwt.sign(
      {
        data: result[0].email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    resp.status(200).json({ email: result[0].email, token });
  });
};

export const ChangePassword = (req, resp, next) => {
  const query = "UPDATE expensemanager.users  SET password=?";
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const data = [hash];

  console.log(data);

  connection.query(query, [data], (err, result) => {
    // console.log(err);
    if (err) return next(createError(500, "ChangePassword server error"));

    if (!result) {
      next(createError(401, "Password Not changed. Try again"));
    }

    resp.status(200).json({
      success: true,
      status: 200,
      message: "password changed succesful",
    });
  });
};

export const verifyEmail = (req, resp, next) => {
  const query = "SELECT email FROM expensemanager.users WHERE email=?";
  const email = req.body.email;

  connection.query(query, [email], (err, result) => {
    if (err) return next(createError(500, "login server error"));
    if (result?.length === 0)
      return next(createError(404, "Invalid email address"));

    resp.status(200).json(result);
  });
};
