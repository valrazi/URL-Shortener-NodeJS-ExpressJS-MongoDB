import express from "express";
const router = express.Router();

router.get("/", async(req, res) =>{
    res.render('html/index');
})

export default router;