import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
dotenv.config();
connectDB();

import urlRouter from './routes/urlRoute.js';
import redirectRouter from './routes/redirectRoute.js';
import detailRouter from './routes/detailRoute.js';
import indexRouter from './routes/indexRoute.js';
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');


app.use("/", redirectRouter);
app.use("/api", urlRouter);
app.use("/", detailRouter)
app.use("/", indexRouter);
//Setuo Server
app.listen(process.env.PORT, () =>{
    console.log(`Server running at ${process.env.PORT}`);
})