import express from "express";
import Url from "../models/Url.js";
const router = express.Router();

router.get("/detail/:urlId", async(req,res) =>{
    try{
        const url = await Url.findOne({urlId: req.params.urlId});
        if(url){
            res.render('html/detail', {
                url:url
            });
        }else{
            res.status(404).json("Short URL not found");

        }
    }catch(err){
        res.status(500).json("Internal server error");
    }
})

export default router;
