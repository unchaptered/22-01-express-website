import axios from "axios";
import { getLogin, passwordCompared, passwordLength, passwordRegex, postLogin } from "./validator.js";

describe("Modules",()=>{
    const req={
        body: {
            nickname: "nickname",
            userId: "userId",
            password: "rkawk13@!",
            password2: "rkawk13@!"
        }
    };
    const res={};

    test("isSame both password?", ()=>{
        const isSame=passwordCompared(req.body.password,req.body.password2);
        expect(isSame).toEqual(true);
    });
    test("isOk length of password?", ()=>{
        const isOkLength=passwordLength(req.body.password);
        expect(isOkLength).toEqual(true);
    });
    test("isOk regex of password?", ()=>{
        const isOkRegex=passwordRegex(req.body.password);
        expect(isOkRegex).toEqual(true);
    });
});