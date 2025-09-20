import {Router} from "express";
import {registerStudent,loginStudent,updateStudent,deleteStudent,getAllStudents,getStudentById,logoutStudent  } from "../controllers/student.controller.js";
import { validateEmailPassword } from "../validators/student.validators.js";
import authenticate from "../middleware/auth.js";

const studentRouter = Router();

studentRouter.post("/registerstudent",validateEmailPassword, registerStudent);
studentRouter.post("/loginstudent", validateEmailPassword, loginStudent);
studentRouter.put("/updatestudent", authenticate, updateStudent);
studentRouter.get("/getallstudents", authenticate,getAllStudents);
studentRouter.get("/getstudentbyid", authenticate , getStudentById);
studentRouter.delete("/deletestudent",authenticate, deleteStudent);
studentRouter.post("/logoutstudent", authenticate ,logoutStudent);
export default studentRouter;