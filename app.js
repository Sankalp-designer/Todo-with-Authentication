import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./data/config.env"
})

//Using Middleware
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(taskRouter);
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = ['http://localhost:4000', 'https://todo-with-authentication.onrender.com/'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
  });
app.use(cors({
    origin: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 204
}));





app.get("/", (req,res)=>{
    res.send("Nice working");
})

app.use(errorMiddleware)
