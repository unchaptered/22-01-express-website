import "dotenv/config";
import { logger } from "../config/winston.js";

import "./db.js";

import "./model/userModel.js";
import "./model/postModel.js";

import APP from "./app.js";

APP.listen(process.env.PORT,()=>{
    logger.info("✅ Server on");
});
