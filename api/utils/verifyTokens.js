import createError from "../utils/error.js";
import jwt from "jsonwebtoken";

export const VerifyTokens = (req, resp, next) => {
  const isToken = req.headers.authorization;
  if (!isToken) return next(createError(400, "No valid token"));

  const token = isToken.split(" ")[1];

  if (!token) return next(createError(401, "Unauthorised"));

  jwt.verify(token, process.env.SECRET_KEY, (err, email) => {
    if (err) return next(createError(401, "expired tokens"));

    req.email = email;
    next();
  });
};
