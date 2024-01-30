import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../middleware/customErrors.js";
import { verifyJWT } from "../utils/jwt.js";

// admin
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Admin can only access this route.");
    }
    console.log(roles);
    next();
  };
};

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("No token. Authentication failed.");
  }
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid.");
  }
};
