import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import bcrypt from "bcryptjs";
import config from "./src/config/index.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name must be less 50 chars"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 chars"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
  },
  { timestamps: true }
);

//Encrypt the Password before save: HOOKS
userSchema.pre("save", async (next) => {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods = {
  //Compare Password
  comparePassword: async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  //Generate JWT Token
  generatePassword: async () => {
    jwt.sign({ role: this.role }, config.JWT_SECRET, {
      subject: this._id,
      expiresIn: config.JWT_EXPIRY,
    });
  },

  //Generate forget Password Token
  generateForgotPasswordToken: async () => {
    const forgetToken = crypto.randomBytes(20).toString("hex");
    this.forgetPasswordToken = crypto
      .createHash("sha256")
      .update(forgetToken)
      .digest("hex");

    this.forgetPasswordExpiry = Date.now() + 15 * 60 * 1000;
    return forgetToken;
  },
};
export default mongoose.model("User", userSchema);
