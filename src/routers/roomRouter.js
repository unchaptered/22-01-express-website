import express from "express";
import { deteleRoom, getNewRoom, getRoom, getRoomList, postNewRoom, postRoom } from "../controllers/roomControllers.js";
import { preventLogoutUser } from "../middleware.js";

const ROOM_ROUTER=express.Router();

ROOM_ROUTER.route("/")
    .get(getRoomList);

ROOM_ROUTER.route("/add")
    .all(preventLogoutUser)
    .get(getNewRoom)
    .post(postNewRoom);

ROOM_ROUTER.route("/:id")
    .get(getRoom)
    .post(postRoom)
    .delete(deteleRoom);

export default ROOM_ROUTER;