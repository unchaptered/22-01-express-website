export const getHome=(req, res)=>{
    return res.render("home.pug", { pageTitle: "HOME"});
}