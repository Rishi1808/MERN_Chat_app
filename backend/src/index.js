import express from 'express';
import authRoute from './routes/auth.route.js';
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js';
import cookieParser from "cookie-parser"
import messageRoutes from './routes/message.route.js';
dotenv.config();
const app=express();
const PORT=process.env.PORT || 5001;



app.use(express.json());
app.use(cookieParser())
//Authentiction routes

app.use("/api/auth",authRoute)
app.use("/api/message",messageRoutes)

app.listen(PORT,()=>{
    console.log('server is running on port '+PORT);
     connectDB();
})