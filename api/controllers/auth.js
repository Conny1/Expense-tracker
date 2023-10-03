import { connection } from "../utils/db.js";
import sendMail from "../utils/email.js";
import createError from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const logIntoAccount = (req, resp, next) => {
  const query = "SELECT * FROM analysis_expensemanager.users WHERE email=?";
  const email = req.body.email;

  connection.query(query, [email], (err, result) => {
    if (err) return next(createError(500, "login server error"));
    console.log(result);
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
      { expiresIn: "4h" }
    );

    resp.status(200).json({ email: result[0].email, token });
  });
};

export const ChangePassword = (req, resp, next) => {
  const query = "UPDATE analysis_expensemanager.users  SET password=?";
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const data = [hash];

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

// send email

export const verifyEmail = (req, resp, next) => {
  const query = "SELECT email FROM analysis_expensemanager.users WHERE email=?";
  const email = req.body.email;

  connection.query(query, [email], async (err, result) => {
    if (err) return next(createError(500, "login server error"));
    if (result?.length === 0)
      return next(createError(404, "Invalid email address"));

    await sendMail(result[0]?.email).catch((err) =>
      next(createError(500, "Email server error"))
    );

    resp.status(200).json(result);
  });
};
