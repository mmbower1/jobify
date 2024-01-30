import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "./customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

// setup
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("No job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError("Not authorized to access this route.");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

// job middleware
export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobLocation").notEmpty().withMessage("Job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Invalid job type value"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (val, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(val);
    if (!isValidId) throw new BadRequestError("Invalid MongoDB ID");
    const job = await Job.findById(val);
    if (!job) throw new NotFoundError(`No job with id ${val} found`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("Not authorized to access this route.");
  }),
]);

// auth register middleware
export const validateRegister = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format.")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("Email already exists.");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters."),
  body("location").notEmpty().withMessage("Location is required."),
  body("lastName"),
]);

// auth login middleware
export const validateLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format."),
  body("password").notEmpty().withMessage("Password is required."),
]);

export const validateUpdatedUser = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format.")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      // so the email cant be updated to an already existing email
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("Email already exists.");
      }
    }),
  body("location").notEmpty().withMessage("Location is required."),
  body("lastName"),
]);
