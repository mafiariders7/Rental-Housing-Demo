import express from 'express';
const router = express.Router();

import {testHandler, updateUser} from "../controllers/user.conroller.js"
import { varifyUser } from '../utils/veify.user.js';


router.get("/test-user",testHandler)
router.post('/update-user/:id',varifyUser, updateUser)
export default router;