import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../../config.js";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [100, "Name is too large"],
  },
  parentsname: {
    type: String,
    required: [true, "Parents name is required"],
    trim: true,
    minlength: [3, "Parents name must be at least 3 characters"],
    maxlength: [100, "Parents name is too large"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [4, "Age must be at least 4"],
  },
  rollno: {
    type: String,
    required: [true, "Roll number is required"],
    unique: true,
    trim: true,
    uppercase: true,
    minlength: 1,
    maxlength: [10, "Roll number is too large"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [64, "Password cannot exceed 64 characters"],
  },
  studentclass: {
    type: String,
    required: [true, "Class is required"],
    trim: true,
    uppercase: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    required: [true, "Gender is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    trim: true,
    minlength: [10, "Phone number must be at least 10 characters"],
    maxlength: [10, "Phone number cannot exceed 10 characters"],
  },
}, { timestamps: true });


studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});


studentSchema.methods.cheakpassword =async function (password) {
 return await bcrypt.compare(password, this.password);
}

studentSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id ,  
    username: this.username,
    email: this.email, } ,
   process.env.JWT_SECRET,
  {
      expiresIn: "1d",
    });
}

studentSchema.methods.comparejwt = async function (token) {
  await jwt.verify(token, process.env.JWT_SECRET);

}
export const Student = mongoose.model("Student", studentSchema);
