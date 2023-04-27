import express from "express";
import Url from "../models/Url.js";
const router = express.Router();

router.get("/:urlId", async(req,res) =>{
    try{
        const url = await Url.findOne({urlId: req.params.urlId});
        if(url){
            await Url.updateOne({
                urlId: req.params.urlId,
            },
            {
                $inc: {clickCounts : 1}
            });
            return res.status(301).redirect(url.longUrl);
        }else{
            res.status(404).json("Short URL not found");
        }
    }catch(err){
        res.status(500).json("Internal server error");
    }
})


export default router;
