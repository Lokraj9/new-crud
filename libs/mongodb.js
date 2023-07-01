import mongoose from "mongoose";
const connectMongoDb= async()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI);
        console.log("succesfully connected to the database");
    } catch (error) {
        console.log("error")
    }
};
export default connectMongoDb;