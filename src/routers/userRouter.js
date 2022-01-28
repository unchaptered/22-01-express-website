import express from "express";
import { getUserLists, getJoin, getLogin, postJoin, postLogin, getLogout, getProfile, postProfile, getUserRemove } from "../controllers/userControllers.js";
import { preventLoginUser, preventLogoutUser, preventNonOwner } from "../middleware.js";

const USERS_ROUTER=express.Router();
USERS_ROUTER.route("/").get(getUserLists);
USERS_ROUTER.route("/join").all(preventLoginUser).get(getJoin).post(postJoin);
USERS_ROUTER.route("/login").all(preventLoginUser).get(getLogin).post(postLogin);
USERS_ROUTER.route("/logout").all(preventLogoutUser).get(getLogout);

USERS_ROUTER.route("/:id").get(getProfile).all(preventNonOwner).post(postProfile);
USERS_ROUTER.route("/:id/remove").all(preventNonOwner).get(getUserRemove);

export default USERS_ROUTER;