import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface ICouse extends Document {
  id: number;
  courseTitle: string;
}

const CourseSchema: Schema = new Schema({
  id: { type: Number, required: true },
  courseTitle: { type: String, required: true },
});

const Course = mongoose.model<ICouse>("Course", CourseSchema);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next();
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

//! Melhorar esse arquivo. Como exportar as Models do mongodb?
class Database {
  constructor() {}

  mongodbModels() {
    return {
      course: Course,
      user: User
    };
  }

}

export default Database;
