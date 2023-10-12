import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
    try {
        const data = {...req.body,userRef:req.user.id};
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