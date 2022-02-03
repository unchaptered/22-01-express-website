import dayjs from "dayjs";

/** CustomDate 는 정적 유틸리티 클래스입니다.
 *  생성자 호출 시 에러를 발생시킵니다.
 */
class CustomDate {
    constructor () {
        throw new Error(`CustomDate is Utility Class`);
    }
    
    /**dayjs 라이브러리를 이용한 문자열 시간값을 반환합니다.
     * @returns dayjs().format('YYYY:MM:DD:HH:mm:ss'); 
     */
    static getCreatedDate() {
        return dayjs().format('YYYY:MM:DD:HH:mm:ss');
    }
}

export default CustomDate;