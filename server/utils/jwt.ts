import { UserModel } from "../types/models";
import "dotenv/config";
const JWTSecret = process.env.JWT_SECRET;
import jwt from "jsonwebtoken";

// defense mechanism to ensure that JWT_SECRET is defined in the environment variables
if (!JWTSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/**
 * This function will be used to create a JWT token
 * @param user
 * @returns Token - string
 */
export const createJwtToken = ({ id, email, name }: UserModel): string => {
  // todo : test this function
  const payload = {
    id: id.toString(),
    email: email,
    name: name,
  };

  const token = jwt.sign(payload, JWTSecret, {
    expiresIn: "30d",
  });

  return token;
};

/**
 * This function will be used to get the user from the token if the token is valid
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
