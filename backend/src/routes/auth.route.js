import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';

import { protectRoute } from '../middleware/auth.middleware.js';
import { updateProfile } from '../controllers/auth.controller.js';
const router =express.Router();

//api:- /api/auth/signup
router.post('/signup',signup);
//api:- /api/auth/login
router.post('/login',login)
//api:- /api/auth/logout
router.post('/logout',logout)

//api: /api/auth/update-profile
router.put("/update-profile",protectRoute,updateProfile)

export default router;