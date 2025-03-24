import bcrypt from "bcryptjs";

/**
 * Method to hash a password before saving it to the database
 * @param password - The password to hash
 * @returns A promise with the hashed password or null if an error occurred
 */
export const hashPassword = async (
  password: string,
): Promise<string | null> => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    return null;
  }
};

/**
 * @param password - The password to compare
 * @param hash - The hashed password from the database
 * @returns A promise boolean indicating if the password is correct
 */
export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("Error comparing password:", error);
    return false;
  }
};
