import "dotenv/config";
import { logger } from "../config/winston.js";

import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const DB=mongoose.connection;

DB.on("error", ()=>{
    logger.error("❎ Database off");
}); // "on" can implement several times
DB.once("open", ()=>{
    logger.info("✅ Database on");
}); // "once" can't implemtent once times