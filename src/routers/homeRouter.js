import express from "express";
import { getHome } from "../controllers/homeControllers.js";

const HOME_ROUTER=express.Router();

HOME_ROUTER.route("/").get(getHome);

export default HOME_ROUTER;