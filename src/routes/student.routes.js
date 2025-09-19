import {Router} from "express";
import {registerStudent,loginStudent} from "../controllers/student.controller.js";
import { validateEmailPassword } from "../validators/student.validators.js";

const studentRouter = Router();

studentRouter.post("/registerstudent",validateEmailPassword, registerStudent);
studentRouter.post("/loginstudent", validateEmailPassword, loginStudent);

export default studentRouter;