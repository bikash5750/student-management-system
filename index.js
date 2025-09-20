import express from "express";
import connectdb from "./src/dbconnection/connectdb.js";
import studentRouter from "./src/routes/student.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors()); 

app.use("/api/student", studentRouter);
const startServer = async () => {
  try {
    await connectdb();
  app.listen(3000, () => {
    console.log("server started on port 3000")
  });
    
  } catch (error) {
    console.log("failed to start server", error);
  }
  
}
startServer();