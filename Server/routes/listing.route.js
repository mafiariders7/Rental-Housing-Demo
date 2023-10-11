import express from 'express';

const router = express.Router();

import {createListing} from '../controllers/listing.contoller.js'
import { varifyUser } from '../utils/veify.user.js';

router.post('/createlisting',varifyUser,createListing);

export default router;