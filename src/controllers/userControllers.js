import { passwordCompared, passwordLength, passwordRegex } from "./modules/validator.js";

export const getJoin=(req, res)=>{
    return res.render("screens/join.pug");
}
export const postJoin=(req, res)=>{
    const {
        nickname,
        userId,
        password,
        password2
    }=req.body;

    if(!passwordCompared(password,password2)) return res.status(404).redirect("/join");
    if(!passwordLength(password)) return res.status(404).redirect("/join");
    if(!passwordRegex(password)) return res.status(404).redirect("/join");

    return res.redirect("/");
}
export const getLogin=(req, res)=>{
    return res.render("screens/login.pug");
}
export const postLogin=(req, res)=>{
    const {
        userId,
        password
    }=req.body;

    if(!passwordLength(password)) return res.status(404).redirect("/login");
    if(!passwordRegex(password)) return res.status(404).redirect("/login");
    
    return res.redirect("/");
}
export const getSearch=(req, res)=>{
    return res.render("screens/search.pug");
}
export const postSearch=(req, res)=>{
    return res.render("screens/search.pug");
}