import { Student } from "../models/student.models.js"; // Added .js extension
import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id).select("-password");
    
    if (!student) {
      return res.status(401).json({ message: "Invalid token" }); 
    }

    req.student = student;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticate;