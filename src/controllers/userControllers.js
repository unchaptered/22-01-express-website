/**입력한 비밀번호가 동일해야함
 * @param {*} password 비밀번호
 * @param {*} password2 비밀번호 확인
 * @returns true or false
 */
export function passwordCompared(password,password2) {
    return password===password2;
}
/**비밀번호는 8자리 초과 20자리 이하
 * @param {*} password 
 * @returns true or false
 */
export function passwordLength(password) {
    return password.length>6 && password.length<=20;
}
/**비밀번호는 특수문자를 1개 이상 보유
 * @param {*} password 
 * @returns true or false
 */
export function passwordRegex(password) {
    const regex = new RegExp(/\W{1,}/);
    return regex.test(password);
}
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