/**
 * This function helps to handle validation errors from Mongoose
 * It pretty much iterates through the error object and returns a single string to display to the client
 */
export const handleValidationErrors = (error: any): string => {
  const messages = Object.values(error.errors).map((err) => err);

  return messages.join(", "); // Join multiple messages into a single string
};

export const cleanToken = (token: string): string => {
  return token.split(" ").pop().trim();
};
