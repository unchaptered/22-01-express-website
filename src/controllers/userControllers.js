import User from "./classes/User.js";
import CustomDate from "./classes/CustomDate.js";

import bcrypt from "bcrypt";
import userModel from "../model/userModel.js";

export const getJoin=(req, res)=>{
    return res.render("screens/user/join.pug");
}
export const postJoin=async(req, res)=>{
    const { username, userId, password, password2 }=req.body;
    console.log(req.body);

    const userExists=await userModel.findOne({ userid:userId });
    if(userExists) {
        req.flash("error", "이미 존재하는 이이디 입니다.");
        return res.status(304).redirect("/users/join");
    }

    let user;
    try {
        user=new User(username,userId,password,password);
        user.setCreatedDate=CustomDate.getCreatedDate();
    } catch(err) {
        req.flash("error", err);
        return res.status(304).redirect("/users/join");
    }

    try {
        const userDB=await userModel.create({ 
            username:user.getUsername,
            userid:user.getUserid,
            userpw:user.getUserpw,
            createdDate:user.getCreatedDate
        });
    } catch(err) {
        req.flash("error", err);
        return res.status(304).redirect("/users/join");
    }

    req.flash("data", userId);
    return res.redirect("/users/login");
}
export const getLogin=(req, res)=>{
    return res.render("screens/user/login.pug");
}
export const postLogin=async(req, res)=>{
    const { userId, password }=req.body;

    try {
        const user=new User("",userId,password,password);
    } catch(err) {
        req.flash("error", err);
        return res.status(304).redirect("/users/login");
    }

    const userDB=await userModel.findOne({ userid:userId });    
    if (userDB===null) {
        req.flash("error", "존재하지 않는 이이디 입니다.");
        return res.status(404).redirect("/users/login");
    }

    const isSameBothPassword=await bcrypt.compare(password, userDB.userpw);
    if (!isSameBothPassword) {
        req.flash("error", "일치하지 않는 비밀번호 입니다.");
        return res.status(304).redirect("/users/login");
    }

    req.session.loggedIn=true;
    req.session.user=userDB;
    return res.status(200).redirect("/");
}
export const getLogout=(req, res)=>{
    req.session.destroy();
    
    return res.status(200).redirect("/");
}
export const getProfile=async(req, res)=>{
    const { id }=req.params;

    const userDB=await userModel.findById({ _id:id });

    const userObj={
        _id:userDB._id,
        userid:userDB.userid,
        username:userDB.username,
        createdDate:userDB.createdDate
    };
    
    return res.render("screens/user/profile.pug", { userDB:userObj });
}
export const postProfile=async(req,res)=>{
    const {
        body: { username, userId },
        params: { id },
        session: {
            user: { username:sessionUsername, userid:sessionUserid }
        }
    }=req;

    if(username===sessionUsername) {
        if(userId===sessionUserid) {
            req.flash("error", "닉네임, 아이디가 동일합니다.");
            return res.status(304).redirect(`/users/${id}`);
        }
        req.flash("error", "아이디가 동일합니다.");
        return res.status(304).redirect(`/users/${id}`);
    } else {
        if(userId===sessionUserid) {
            req.flash("error", "닉네임이 동일합니다.");
            return res.status(304).redirect(`/users/${id}`);
        }
    }

    if(!User.idLength(userId)) {
        req.flash("error", "7자 초과 20자 미만의 아이디를 입력해주세요.");
        return res.status(304).redirect(`/users/${id}`);
    }
    if(!User.idRegex(userId)) {
        req.flash("error", "아이디에 한글이 포함되면 안됩니다.");
        return res.status(304).redirect(`/users/${id}`);
    }

    const userExists=await userModel.findOne({ userid:userId });
    if(userExists) {
        req.flash("error", "이미 존재하는 이이디 입니다.");
        return res.status(304).redirect(`/users/${id}`);
    }

    const userDB=await userModel.findById({ _id:id });
    userDB.userid=userId;
    userDB.username=username;
    userDB.save();
    req.session.user=userDB;

    return res.status(200).redirect(`/users/${id}`);
}
export const getUserLists=async(req, res)=>{
    const userDBLists=await userModel.find().limit(10);
    console.log(userDBLists);

    return res.render("screens/user/userList.pug", {userDBLists});
}
export const getUserRemove=async(req, res)=>{
    const { _id }=req.session.user;

    const userDB=await userModel.findByIdAndRemove({_id});
    req.session.destroy();

    return res.status(200).redirect("/");
}
export const getSearch=(req, res)=>{
    return res.render("screens/user/search.pug");
}
export const postSearch=(req, res)=>{
    return res.render("screens/user/search.pug");
}