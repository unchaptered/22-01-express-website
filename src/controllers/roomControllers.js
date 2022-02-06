import Chat from "./classes/Chat.js"
import Room from "./classes/Room.js"

import CustomDate from "./classes/CustomDate.js";

import chatModel from "../model/chat/chatModel.js";
import roomModel from "../model/chat/roomModel.js";
import userModel from "../model/userModel.js";

import { logger } from "../../config/winston.js";

// 여기만 websocket 으로 만들면 되는 거 아닌가?
export const getRoomList=async(req, res)=>{
    const roomDBList=(await roomModel.find().limit(10).populate("ownerId"))
        .map(({
            _id, roomtitle, roompw, roommax, ownerId:{_id:ownerId, username}, createdDate
        })=>{
            const room=new Room(roomtitle, roompw, roommax, ownerId);
            room.setCreatedDate=createdDate;
            room.setRoomid=_id;
            room.username=username;
            return room;
        });

    return res.render("screens/room/room_list.pug", {
        roomDBList
    });
}

export const getNewRoom=(req, res)=>{
    return res.render("screens/room/room_add.pug");
}
export const postNewRoom=async(req, res)=>{
    const { 
        session: { user: { _id } },
        body: { roomtitle="제목없음", roompw="", roommax="5" }
    }=req;

    const userExists=await userModel.exists({_id});
    if(!userExists) {
        logger.error(`❌ postNewRoom ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / login's user is not exsits, please re login`);
        req.flash("error", "존재하지 않는 아이디, 다시 로그인을 해주세요.");
        return res.redirect("/rooms/add");
    }
    
    let room=null;
    try{
        room=new Room(roomtitle, roompw, roommax, _id);
        room.setCreatedDate=CustomDate.getCreatedDate();
    } catch(err) {
        logger.error(`❌ postNewRoom ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / ${err}`);
        req.flash("error", err);
        return res.redirect("/rooms/add");
    }


    const roomDB=await roomModel.create({...room});

    logger.info(`⭕ postNewRoom ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.redirect("/rooms");
}

export const getRoom=async(req, res)=>{
    const { id:_id }=req.params;

    const { roomtitle, roommax, ownerId:{ username } }=await roomModel.findById({_id}).populate("ownerId");
    if (!Room.roomtitleLength(roomtitle)) {
        const text=`roomtitle ${roomtitle.length} $(roomtitle>1 && roomtitle<=16)`;
        logger.error(`❌ postNewRoom ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / ${text}`);
        req.flash("error", text);
        return res.redirect("/rooms");
    }
    if (!Room.roommaxSize(roommax)) {
        const text=`roommax ${roommax.length} $(roommax>1 && roommax<=10)`;
        logger.error(`❌ postNewRoom ${req.headers["x-forwarded-for"] || req.connection.remoteAddress} / ${text}`);
        req.flash("error", text);
        return res.redirect("/rooms");
    }

    logger.info(`⭕ getRoom ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}`);
    return res.render("screens/room/room_detail.pug", { roomDB:{roomtitle, roommax, username} });
}
export const postRoom=(req, res)=>{
    return res.render("screens/room/room_list.pug");
}
export const deteleRoom=(req, res)=>{
    console.log("deteleRoom");

    return res.render("screens/room/room_list.pug");
}