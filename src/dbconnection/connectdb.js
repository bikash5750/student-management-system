import mongoose from "mongoose";
import { MONGO_URI}  from "../../config.js";

const connectdb  = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
      console.log(`monogodb connection failed` , error);
      process.exit(1);
    }
}
export default connectdb
