import mongoose, { mongo } from "mongoose";

const UrlSchema = new mongoose.Schema({
    urlId:{
        type:String,
        required:true,
    },
    longUrl:{
        type:String,
        required:true,
    },
    shortUrl:{
        type:String,
        required:true,
    },
    clickCounts:{
        type:Number,
        required:true,
        default:0,
    },
    createdAt:{
        type:String,
        default: Date.now,
    },
});

export default mongoose.model('Url', UrlSchema);