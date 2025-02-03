import express from 'express';
import authRoute from './routes/auth.route.js';
import dotenv from 'dotenv';

dotenv
const app=express();
const PORT=process.env.PORT || 5001;




//Authentiction routes

app.use("/api/auth",authRoute)

app.listen(PORT,()=>{
    console.log('server is running on port '+PORT);
})