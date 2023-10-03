import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
    dbName: "backedapi",
})
.then(()=> console.log("Database connected"))
.catch((e)=>console.log(e));
}