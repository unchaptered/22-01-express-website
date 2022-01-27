import jest from "jest-mock";
import { localMiddleWare, preventLoginUser, preventLogoutUser } from "./middleware"

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
});