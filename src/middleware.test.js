import jest from "jest-mock";
import { localMiddleWare, preventLoginUser, preventLogoutUser, preventNonOwner } from "./middleware"

describe("Middlewares", ()=>{
    describe("localMiddleware", ()=>{
        const req={
            session: {
                loggedIn: true,
                user: {
                    nickname: "testerNickname",
                    userid: "testerUserid",
                    userpw: "testerPassword12@"
                }
            }
        };
        const res={
            locals: {
                loggedIn: false,
                loggedInUser: null
            }
        };
        function success() {
            return true;
        };
        test("login sinario", ()=>{
            localMiddleWare(req,res,success);
            expect(res.locals.loggedIn).toBeTruthy();
            expect(res.locals.loggedInUser).toMatchObject(req.session.user);
        });
        test("logout sinario", ()=>{
            // req.session.destroy() 를 하면 undefined 값을 가진다.
            req.session=undefined;
            localMiddleWare(req,res,success);
            expect(res.locals.loggedIn).toBeFalsy();
            expect(res.locals.loggedInUser).toBeNull();
        });
    });
    describe("preventLoginUser", ()=>{
        const req={
            session: {
                loggedIn: true,
                user: {
                    nickname: "testerNickname",
                    userid: "testerUserid",
                    userpw: "testerPassword12@"
                }
            }
        };
        const res={
            locals: {
                loggedIn: false,
                loggedInUser: null
            },
            statusCode: null,
            URL: null,
            status: function status(statusCode) {
                res.statusCode=statusCode;
                return res;
            },
            redirect: function redirect(URL) {
                res.URL=URL;
                return res;
            }
        };
        const next=jest.fn();
        test("loginUser sinario", ()=>{
            preventLoginUser(req,res,next);
            expect(res.statusCode).toBe(304);
            expect(res.URL).toBe("/");
        });
        test("logoutUser sinario", ()=>{
            res.statusCode=null;
            res.URL=null;

            /* req.session.destory() 를 하면 undefined 값을 가진다.
            */
            req.session.loggedIn=null;
            req.session.user=null;
            preventLoginUser(req,res,next);
            expect(res.statusCode).toBeNull();
            expect(res.URL).toBeNull();
        });
    });
    describe("prventLogoutUser", ()=>{
        const req={
            session: {
                loggedIn: true,
                user: {
                    nickname: "testerNickname",
                    userid: "testerUserid",
                    userpw: "testerPassword12@"
                }
            }
        };
        const res={
            locals: {
                loggedIn: false,
                loggedInUser: null
            },
            statusCode: null,
            URL: null,
            status: function status(statusCode) {
                res.statusCode=statusCode;
                return res;
            },
            redirect: function redirect(URL) {
                res.URL=URL;
                return res;
            }
        };
        const next=jest.fn();
        test("loginUser sinario", ()=>{
            preventLogoutUser(req,res,next);
            expect(res.statusCode).toBeNull();
            expect(res.URL).toBeNull();
        });
        test("logoutUser sinario", ()=>{
            /* req.session.destory() 를 하면 undefined 값을 가진다.
            */
            req.session.loggedIn=null;
            req.session.user=null;
            preventLogoutUser(req,res,next);
            expect(res.statusCode).toBe(304);
            expect(res.URL).toBe("/");
        });
    });
    describe("preventNonOwner", ()=>{
        const req={
            session: {
                loggedIn: true,
                user: {
                    _id: "samplehashedid",
                    nickname: "testerNickname",
                    userid: "testerUserid",
                    userpw: "testerPassword12@"
                }
            },
            params: {
                id: "samplehashedid"
            },
            flashes: {},
            flash: function flash(key, value) {
                req.flashes.error=value;
            }
        };
        const res={
            locals: {
                loggedIn: false,
                loggedInUser: null
            },
            statusCode: null,
            URL: null,
            status: function status(statusCode) {
                res.statusCode=statusCode;
                return res;
            },
            redirect: function redirect(URL) {
                res.URL=URL;
                return res;
            }
        };
        const next=jest.fn();
        test("Onwer",()=>{
            res.statusCode=null;
            res.URL=null;

            const empty={};
            preventNonOwner(req,res,next);
            expect(res.statusCode).toBeNull();
            expect(res.URL).toBeNull();
            expect(req.flashes).toEqual(empty);
        });
        test("Non-Onwer", ()=>{
            req.session.user._id="samplehashedid2";
            res.statusCode=null;
            res.URL=null;
            preventNonOwner(req,res,next);
            expect(res.statusCode).toBe(304);
            expect(res.URL).toBe(`/users/${req.params.id}`);
            expect(req.flashes.error).toBe("해당 계정의 소유주가 아닙니다.\n부정한 경로로 접속하지 마십시오.");
        });
    })
});