import { Schema, model, Document } from "mongoose";
import { UserModel } from "../types/models";
import { comparePassword, hashPassword } from "../helpers/bcrypt";

// ! This was from ChatGPT not me lol
interface UserDocument extends Omit<UserModel, "id">, Document {
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
    minlength: [4, "Name must be a minimum length of 4 characters"],
    maxlength: [15, "Name must be a maximum length of 15 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email is already in use"],
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    trim: true,
  },

  profilePicture: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
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
