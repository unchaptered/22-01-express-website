import axios from "axios";
import {
    idLength,
    idRegex,
    passwordCompared,
    passwordLength,
    passwordRegex,
} from "./validator.js";

describe("Validators", ()=>{
    describe("Id Validators", ()=>{
        let userId="tmp";
        describe("Id Length 6 < * <=30", ()=>{
            test(`id.length = 3`, ()=>{
                userId="tmp"
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id.length = 31`, ()=>{
                userId="abcdeabcdeabcdeabcdeabcdeabcdea";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id.length = 10`,()=>{
                userId="bmgktlqejr";
                const result=idLength(userId);
                expect(result).toBeTruthy();
            });
        });
        describe("Id Regex /[ㄱ-ㅎㅏ-ㅣ가-힣]/g", ()=>{
            test(`id = 안abcd`, ()=>{
                userId="안abcd";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id = ab안cd`, ()=>{
                userId="ab안cd";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id = abcd안`, ()=>{
                userId="abcd안";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id = ㅇabcd`, ()=>{
                userId="ㅇabcd";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id = abㅇcd`, ()=>{
                userId="abㅇcd";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id = abcdㅇ`, ()=>{
                userId="abcdㅇ";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id = ㅏabcd`, ()=>{
                userId="ㅏabcd";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id = abㅏcd`, ()=>{
                userId="abㅏcd";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id = abcdㅏ`, ()=>{
                userId="abcdㅏ";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
        });
    });

    describe("Password Validators", ()=>{
        describe("Pw Compared a === b", ()=>{
            let password="";
            let password2="";
            test("rkawk13@! === rkawk13@!", ()=>{
                password="rkawk13@!";
                password2="rkawk13@!";
                const result=passwordCompared(password,password2);
                expect(result).toBeTruthy();
            });
            test("rkawk13@! === rkawk14@!", ()=>{
                password="rkawk13@!";
                password2="rkawk14@!";
                const result=passwordCompared(password,password2);
                expect(result).toBeFalsy();
            });
        });
        describe("Pw Length 6 < * <=20", ()=>{
            let password="";
            test("passowrd.length = 3", ()=>{
                password="tmp";
                const result=passwordLength(password);
                expect(result).toBeFalsy();
            });
            test("passowrd.length = 21", ()=>{
                password="abcdeabcdeabcdeabcdea";
                const result=passwordLength(password);
                expect(result).toBeFalsy();
            });
            test("passowrd.length = 8", ()=>{
                password="dafmdslkaf";
                const result=passwordLength(password);
                expect(result).toBeTruthy();
            });
        });
        describe("Pw Regex /\W{1,}/", ()=>{
            let password="";
            test("pw = abcd", ()=>{
                password="abcd";
                const result=passwordRegex(password);
                expect(result).toBeFalsy();
            });
            test("pw = @abcd", ()=>{
                password="@abcd";
                const result=passwordRegex(password);
                expect(result).toBeTruthy();
            });
            test("pw = ab@cd", ()=>{
                password="ab@cd";
                const result=passwordRegex(password);
                expect(result).toBeTruthy();
            });
            test("pw = abcd@", ()=>{
                password="abcd@";
                const result=passwordRegex(password);
                expect(result).toBeTruthy();
            });
        })
        const req={
            body: {
                nickname: "nickname",
                userId: "userId",
                password: "rkawk13@!",
                password2: "rkawk13@!"
            }
        };
        describe("Pw Campared, Length, Regex", ()=>{
            test(`${req.body.password}, ${req.body.password2}`, ()=>{
                const { password, password2 }=req.body;

                let result=true;
                if(!passwordCompared(password,password2)) {
                    result=false;
                }
                if(!passwordLength(password)) {
                    result=false;
                }
                if(!passwordRegex(password)) {
                    result=false;
                }
                expect(result).toBeTruthy();
            });
        })
    });
});