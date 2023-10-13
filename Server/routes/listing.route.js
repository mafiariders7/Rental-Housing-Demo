import express from 'express';

const router = express.Router();

import {createListing ,deleteListing ,updateListing ,getListing} from '../controllers/listing.contoller.js'
import { varifyUser } from '../utils/veify.user.js';

router.post('/createlisting',varifyUser,createListing);
router.delete('/deletelisting/:id',varifyUser,deleteListing)
router.post('/updatelisting/:id',varifyUser,updateListing)
router.get('/getListing/:id',getListing);

export default router;