import "dotenv/config";
import { logger } from "../config/winston.js";

import "./db.js";

import "./model/userModel.js";
import "./model/postModel.js";

import "./model/chat/chatModel.js";
import "./model/chat/roomModel.js";

import APP, { SESSION_MIDDLEWARE } from "./app.js";

import webSocket from "./socket.js";

const SERVER=APP.listen(process.env.PORT,()=>{
    logger.info("✅ Server on");
});

webSocket(SERVER, APP, SESSION_MIDDLEWARE);