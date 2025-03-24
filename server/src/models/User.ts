import { Schema, model, Document } from "mongoose";
import { UserModel } from "../types/models";
import { comparePassword, hashPassword } from "../helpers/bcrypt";

// ! This was from ChatGPT not me lol
interface UserDocument extends Omit<UserModel, "id">, Document {
  id: string; // Override Mongoose Document ID type since they are clashing with one another
  password: string;
  checkUserPassword(password: string): Promise<boolean>;
}

const userSchema: Schema<UserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
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
    next();
  } else {
    next(new Error("Error hashing password"));
  }
});

const User = model<UserDocument>("User", userSchema);

export default User;
