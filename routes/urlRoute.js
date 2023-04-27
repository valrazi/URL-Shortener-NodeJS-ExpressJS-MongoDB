import express from "express";
import {nanoid} from 'nanoid';
import Url from '../models/Url.js';
import validUrl from 'valid-url';
import dotenv from 'dotenv';
dotenv.config({path:'../.env'});

const router = express.Router();
function urlShortner(){
    const base62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let shorUrl = ""
    for (let i = 1; i <= 7; i++) {
        shorUrl += base62.charAt(Math.floor(Math.random() * base62.length));
    }
    return shorUrl;
}
router.post('/short', async(req, res)=>{
    const {longUrl} = req.body;
    const base = process.env.BASE_URL;

    const urlId = urlShortner();
    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({longUrl});
            if(url){
                res.status(200).json({"message":"Long Url already exist!", url});
            }else{
                const shortUrl = `${base}/${urlId}`;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                })
                await url.save();
                res.render('html/short', {url: url})
            }
        }catch(err){
            console.log(err);
            res.status(500).json('Internal Server Error');
        }
    }else{
        res.status(400).json('Invalid URL');
    }
})

export default router;