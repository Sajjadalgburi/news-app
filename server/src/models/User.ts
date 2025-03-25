import { Schema, model, Document } from "mongoose";
import { UserModel } from "../types/models";
import { comparePassword, hashPassword } from "../helpers/bcrypt";

// ! This was from ChatGPT not me lol
interface UserDocument extends Omit<UserModel, "id">, Document {
  _id: string; // Ensures _id is treated as a string in TypeScript
  password: string;
  createdAt: Date;
  updatedAt: Date;
  profilePicture?: string;
  checkUserPassword(password: string): Promise<boolean>;
}

const userSchema: Schema<UserDocument> = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be a minimum length of 3"],
    maxlength: [50, "Name must be a maximum length of 50"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already in use"],
    match: /^\S+@\S+\.\S+$/, // Regex for email validation
  },
  profilePicture: { type: String },
  password: {
    type: String,
    required: true,
    minlength: [6, "password must be 6 letters long"],
    maxlength: [20, "password must be 20 letters long"],
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // Users can make multiple comments
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Custom method to check the password
userSchema.methods.checkUserPassword = function (
  password: string,
): Promise<boolean> {
  return comparePassword(password, this.password);
};

// Hash password before saving user
userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashed = await hashPassword(this.password);
  if (hashed) {
    this.password = hashed;
    this.email = this.email.toLowerCase(); // Ensure email is always lowercase

    next();
  } else {
    next(new Error("Error hashing password"));
  }
});

const User = model<UserDocument>("User", userSchema);

export default User;
