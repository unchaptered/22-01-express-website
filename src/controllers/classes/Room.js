/**.../src/model/chat/roomModel.js
 * 
 * 1< roomtitle.length <=16 ❌ `new TypeError("roomtitle ${roomtitle.length} $(roomtitle>1 && roomtitle<=16)");`
 * 
 * 1< +roomsize <=10 ❌ `new TypeError("roommax ${roommax.length} $(roommax>1 && roommax<=10)");`
 */
class Room {
    roomid;
    roomtitle;
    roommax;
    ownerId;
    roompw;
    createdDate;

    constructor (roomtitle, roompw, roommax, ownerId) {
        if (!Room.roomtitleLength(roomtitle)) throw new TypeError(`roomtitle ${roomtitle.length} $(roomtitle>1 && roomtitle<=16)`);
        if (!Room.roommaxSize(roommax)) throw new TypeError(`roommax ${roommax.length} $(roommax>1 && roommax<=10)`);

        this.roomtitle=roomtitle;
        this.roompw=roompw;
        this.roommax=roommax;
        this.ownerId=ownerId;
    }

    /**채팅방 제목 1<*<=16
     * @param {*} roomtitle 
     * @returns true or false
     */
    static roomtitleLength(roomtitle) {
        const result=roomtitle.length>1 && roomtitle.length<=16;
        return result;
    }

    /**채팅방 최대 인숸수 1<*<=10
     * @param {*} roomsize
     * @returns true or false
     */
    static roommaxSize(roomsize) {
        const result=(+roomsize)>1 && (+roomsize)<=10;
        return result;
    }

    set setRoomid(_id) {
        this.roomid=_id;
    }
    set setRoomtitle(roomtitle) {
        this.roomtitle=roomtitle;
    }
    set setRoommax(roommax) {
        this.roommax=roommax;
    }
    set setRoompw(roompw) {
        this.roompw=roompw;
    }
    set setOwnerId(ownerId) {
        this.ownerId=ownerId;
    }
    set setCreatedDate(createdDate) {
        this.createdDate=createdDate;
    }

    get getRoomid() {
        return this.roomid;
    }
    get getRoomtitle() {
        return this.roomtitle;
    }
    get getRoommax() {
        return this.roommax;
    }
    get getRoompw() {
        return this.roompw;
    }
    get getOwnerId() {
        return this.ownerId;
    }
    get getCreatedDate() {
        return this.createdDate;
    }
}

export default Room;