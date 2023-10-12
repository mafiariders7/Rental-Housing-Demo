import express from 'express';

const router = express.Router();

import {createListing ,deleteListing} from '../controllers/listing.contoller.js'
import { varifyUser } from '../utils/veify.user.js';

router.post('/createlisting',varifyUser,createListing);
router.delete('/deletelisting/:id',varifyUser,deleteListing)
export default router;