const pwRegexPattern = new RegExp(/\W{1,}/);
const idRegexPattern = new RegExp(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g);
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
    return pwRegexPattern.test(password);
}
/**아이디는 6자리 초과 30자리 이하
 * @param {*} id 
 * @returns true or false
 */
export function idLength(id) {
    const result=id.length>6 && id.length<=20;
    return result;
}
/**아이디에 한글 포함시 false 리턴, 아닐 시 true 리턴
 * @param {*} id 
 */
export function idRegex(id) {
    const result=!idRegexPattern.test(id);
    console.log(result);
    return result;
}