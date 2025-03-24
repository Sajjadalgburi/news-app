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
 */
export const validateJwtToken = (token: string) => {
  try {
    return jwt.verify(token, JWTSecret);
  } catch (error) {
    if (error.name === "TokenExpiredError") return null; // Token expired
    return null;
  }
};
