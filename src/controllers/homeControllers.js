import { logger } from "../../config/winston.js";

export const getHome=(req, res)=>{
    logger.info(`⭕ getHome ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.render("home.pug", { pageTitle: "HOME"});
}