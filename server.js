import * as dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

import "express-async-errors";
import "colors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// routes
import authRouter from "./routes/authRouter.js";
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
// mongo
import connectDB from "./config/db.js";
// middleware
import { authenticateUser } from "./middleware/authMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

const app = express();
const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

connectDB();

// Middleware - incorrect route
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// Middleware - error
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`jobify server running on PORT ${port}`.brightBlue.bold);
});
