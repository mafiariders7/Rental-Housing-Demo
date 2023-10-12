import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const data = { ...req.body, userRef: req.user.id };
        // console.log(ress);
        // console.log(req.user);
        const listing = await Listing.create(data);
        res.status(201).json({
            success: true,
            listing
        })
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return next(errorHandler(404, 'Create the listing before deletion'));
        // console.log(listing.userRef.toString())
        if (req.user.id !== listing.userRef.toString()) return next(errorHandler(401, 'Unauthorized'));
      
        await Listing.findByIdAndDelete(req.params.id);
        res.status(202).json({
            message:"Deletion successful"
        })
    } catch (error) {
        next(error);
    }
}
