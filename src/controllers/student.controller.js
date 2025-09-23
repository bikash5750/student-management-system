import { Student } from "../models/student.models.js";
import redisclient from "../redisconfig/redis.js";
import jwt from "jsonwebtoken";
import main from "../aicomm/genai.comm.js";



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

  try {
    const students = await Student.find().select("-password "); 
    return res.status(200).json({ students });   
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getStudentById = async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const student = await Student.findOne({ phone}).select("-password");
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ student });
    
  } catch (error) {
    console.error("Error fetching student by phone:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const updateStudent = async (req, res) => {
  try {
    const { phone, ...updateData } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const student = await Student.findOneAndUpdate(
      { phone }, 
      updateData, 
      { new: true }
    ).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json(student);

  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteStudent = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    const student = await Student.findOneAndDelete({ phone });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

}

const logoutStudent = async (req, res) => {
  try {
    const{token} = req.cookies;
    const payload = jwt.decode(token);
    console.log(payload);

    await redisclient.SET(`token:${token}`,"blocked");
    await redisclient.EXPIREAT(`token:${token}`,payload.exp);
    //console.log(" Saved blocked token:", `token:${token}`, "exp:", payload.exp);

    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
    
  } catch (error) {
    console.error("Error logging out student:", error);
    return res.status(500).json({ message: "Internal server error" });
    
  }
}
 const chatHistoryKey = {};

const aicomm = async (req, res) => {
  try {

    const{phone, msg} = req.body;

    if(!phone || !msg){
      return res.status(400).json({message: "Phone and msg are required"});
    }

    //initilization of chat history
   
    if(!chatHistoryKey[phone]){
      chatHistoryKey[phone] = [];
    }


    const history = chatHistoryKey[phone];
     const promptmessage = [
      ...history,
      { role: "user", parts: [{ text: msg }] }
    ];

    const answer = await main(promptmessage);
    history.push({ role: "user", parts: [{ text: msg }] });
    history.push({ role: "model", parts: [{ text: answer }] });

  console.log("AI response history is:", JSON.stringify(history, null, 2));
    res.status(200).json({ answer });


    
  } catch (error) {
    console.error("Error in AI communication:", error);
    return res.status(500).json({message: "Internal server error"});
  }
}

export { registerStudent, loginStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, logoutStudent, aicomm };