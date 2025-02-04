import express from 'express';
import authRoute from './routes/auth.route.js';
import dotenv from 'dotenv';
import {connectDB} from './lib/db.js';
import cookieParser from "cookie-parser"
dotenv.config();
const app=express();
const PORT=process.env.PORT || 5001;



app.use(express.json());
app.use(cookieParser())
//Authentiction routes

app.use("/api/auth",authRoute)

app.listen(PORT,()=>{
    console.log('server is running on port '+PORT);
     connectDB();
})