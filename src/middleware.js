/**LocalStorage 에 로그인 여부 및 유저 정보를 저장합니다.
 * @param {*} next >> router, controllers
 */
export const localMiddleWare=(req,res,next)=>{
    if(req.session !== undefined) {
        res.locals.loggedIn=Boolean(req.session.loggedIn);
        res.locals.loggedInUser=req.session.user || null;
        return next();
    }
    res.locals.loggedIn=false;
    res.locals.loggedInUser=null;
    return next();
}
/**Session, 로그인이 된 유저를 차단합니다.
 * @param {*} next >> controllers
 */
export const preventLoginUser=(req,res,next)=>{
    if (req.session.loggedIn) {
        // console.log("로그인 유저가 잘못된 경로로 접속 시도하였습니다.");
        return res.status(304).redirect("/");
    } else {
        return next();
    }
}
/**Session, 로그인 되지 않은 유저를 차단합니다.
 * @param {*} next >> controllers
 */
export const preventLogoutUser=(req,res,next)=>{
    if (!req.session.loggedIn) {
        // console.log("미로그인 유저가 잘못된 경로로 접속 시도하였습니다.");
        return res.status(304).redirect("/");
    } else {
        return next();
    }
}