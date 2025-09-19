import { Student } from "../models/student.models.js";


const registerStudent = async (req, res) => {

  try {
    const { name , age , password  , email , parentsname , rollno , gender , phone , studentclass} = req.body;

    if(!name  || !age || !password || !email || !parentsname || !rollno || !gender || !phone || !studentclass){
      res.status(400).json({message: "All fields are required"});
    }

    const findstudent  = await Student.findOne({
      $or :[{email},{rollno},{phone}],
    })

    if(findstudent){
      res.status(409).json({message: "Student already exists"});
    }

    const newstudent = await Student.create({
    name, age, password, email, parentsname, rollno , gender, phone, studentclass
    });

    await newstudent.save()


    return res.status(201).json({
      msg : "Student registered successfully",
      data :{
        name,
        rollno,
        email,
        age,
        gender,
        studentclass,
        parentsname
      
      }
    });
    
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({message: "Internal server error"});
  }
   
}
const loginStudent = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ message: "Email or phone is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const foundStudent = await Student.findOne({ $or: [{ email }, { phone }] });

    if (!foundStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await foundStudent.cheakpassword(password); // typo in model, should be checkPassword
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await foundStudent.generateToken();

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      message: "Login successful",
      data: {
        name: foundStudent.name,
        email: foundStudent.email,
        rollno: foundStudent.rollno,
        studentclass: foundStudent.studentclass,
        age: foundStudent.age,
        gender: foundStudent.gender,
      },
    });
  } catch (error) {
    console.error("Error logging in student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllStudents = async (req, res) => {
}

const getStudentById = async (req, res) => {
}

const updateStudent = async (req, res) => {
}

const deleteStudent = async (req, res) => {
}

const logoutStudent = async (req, res) => {
}

const changePassword = async (req, res) => {
}
export { registerStudent, loginStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, logoutStudent, changePassword };