import express from "express";
import { getAddPost, getPostLists, getPostRemove, getSinglePost, postAddPost, postEditPost } from "../controllers/postControllers.js";
import { preventLogoutUser, preventNonOwner } from "../middleware.js";

const POST_ROUTER=express.Router();
POST_ROUTER.route("/").get(getPostLists);
POST_ROUTER.route("/write").all(preventLogoutUser).get(getAddPost).post(postAddPost);
POST_ROUTER.route("/:id").get(getSinglePost).post(postEditPost);
POST_ROUTER.route("/:id/remove").get(getPostRemove);

export default POST_ROUTER;