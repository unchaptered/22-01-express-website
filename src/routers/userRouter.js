import express from "express";
import { getJoin, getLogin, postJoin, postLogin, getLogout, getProfile, postProfile } from "../controllers/userControllers.js";
import { preventLoginUser, preventLogoutUser } from "../middleware.js";

const USERS_ROUTER=express.Router();
USERS_ROUTER.route("/join").all(preventLoginUser).get(getJoin).post(postJoin);
USERS_ROUTER.route("/login").all(preventLoginUser).get(getLogin).post(postLogin);
USERS_ROUTER.route("/logout").all(preventLogoutUser).get(getLogout);
USERS_ROUTER.route("/:id").get(getProfile).post(postProfile);

export default USERS_ROUTER;