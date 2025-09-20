import {Router} from "express";
import {registerStudent,loginStudent,updateStudent,deleteStudent,getAllStudents,getStudentById} from "../controllers/student.controller.js";
import { validateEmailPassword } from "../validators/student.validators.js";

const studentRouter = Router();

studentRouter.post("/registerstudent",validateEmailPassword, registerStudent);
studentRouter.post("/loginstudent", validateEmailPassword, loginStudent);
studentRouter.put("/updatestudent", validateEmailPassword, updateStudent);
studentRouter.get("/getallstudents", getAllStudents);
studentRouter.get("/getstudentbyid", getStudentById);
studentRouter.delete("/deletestudent",validateEmailPassword, deleteStudent);
export default studentRouter;