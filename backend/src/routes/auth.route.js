import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';


const router =express.Router();

//api:- /api/auth/signup
router.post('/signup',signup);
//api:- /api/auth/login
router.post('/login',login)
//api:- /api/auth/logout
router.post('/logout',logout)

export default router;