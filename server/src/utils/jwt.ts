import { UserModel } from "../types/models";
import "dotenv/config";
import jwt from "jsonwebtoken";

const JWTSecret = process.env.JWT_SECRET;

// defense mechanism to ensure that JWT_SECRET is defined in the environment variables
if (!JWTSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/**
 * This function will be used to create a JWT token
 * @param user
 * @returns Token - string
 */
export const createJwtToken = (user: UserModel): string | Error => {
  try {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, JWTSecret, {
      expiresIn: "30d",
    });

    return token;
  } catch (e) {
    throw new Error("Could not create the JWT token");
  }
};

/**
 * This function will be used to get the user object from the token if the token is valid
 * @param token
 * @returns User object or null if token is invalid
 */
export const validateJwtToken = (
  token: string,
): {
  id: string;
  email: string;
  name: string;
} | null => {
  try {
    const decoded = jwt.verify(token, JWTSecret) as UserModel;
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError")
      return null;
    return null;
  }
};
