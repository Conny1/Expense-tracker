import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRouter from "./routers/user.js";
import authRouter from "./routers/auth.js";
dotenv.config();
// import "./utils/db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", UserRouter);
app.use("/auth", authRouter);

const PORT = process.env.PRT || 5000;

app.use((err, req, resp, next) => {
  const errorcode = err.status || 500;
  const errorMessage = err.message || "Server Error";

  return resp.status(errorcode).json({
    success: false,
    message: errorMessage,
    status: errorcode,
  });
});
// connection.end();
app.listen(PORT, () => {
  console.log("Connected to backend: PORT:=>" + PORT);
});
