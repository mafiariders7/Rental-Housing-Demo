import express from 'express';
const router = express.Router();

import {testHandler} from "../controllers/user.conroller.js"


router.get("/test-user",testHandler)

export default router;