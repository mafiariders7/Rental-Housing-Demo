import express from 'express';
const router = express.Router();

import {deleteUser, signout, testHandler, updateUser ,getUserListing} from "../controllers/user.conroller.js"
import { varifyUser } from '../utils/veify.user.js';


router.get("/test-user",testHandler)
router.post('/update-user/:id',varifyUser, updateUser);
router.delete('/delete-user/:id',varifyUser, deleteUser);
router.get('/signout',varifyUser,signout);
router.get('/listings/:id',varifyUser,getUserListing);
export default router;