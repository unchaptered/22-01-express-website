import "dotenv/config";

import express from "express";
import morgan from "morgan";
import flash from "express-flash";
import session from "express-session";
import MongoStore from "connect-mongo";

import { localMiddleWare } from "./middleware.js";

import HOME_ROUTER from "./routers/homeRouter.js";
import USERS_ROUTER from "./routers/userRouter.js";
import CONTENTS_ROUTER from "./routers/contentRouter.js";

const APP=express();
const MORGAN=morgan("dev");

APP.set("view engine", "pug");
APP.set("views", process.cwd()+"/src/views"); 

APP.use(MORGAN);

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());

APP.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 7 * 24 * 3600 * 1000 },
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);
APP.use(flash());

APP.use(localMiddleWare);

APP.use("/", HOME_ROUTER);
APP.use("/users", USERS_ROUTER);
APP.use("/contents", CONTENTS_ROUTER);
APP.use("/assets", express.static("assets"));

export default APP;