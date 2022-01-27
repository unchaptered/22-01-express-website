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
        describe("Id Length 6 < * <=30", ()=>{
            test(`id.length = 3`, ()=>{
                const userId="tmp"
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id.length = 21`, ()=>{
                const userId="abcdeabcdeabcdeabcdea";
                const result=idLength(userId);
                expect(result).toBeFalsy();
            });
            test(`id.length = 10`,()=>{
                const userId="bmgktlqejr";
                const result=idLength(userId);
                expect(result).toBeTruthy();
            });
        });
        describe("Id Regex /[ㄱ-ㅎㅏ-ㅣ가-힣]/g", ()=>{
            describe("한글 포함 테스트", ()=>{
                test("id = 안abcd", ()=>{
                    const userId="aaaa";
                    const result=idRegex(userId);
                    expect(result).toBe(false);
                });
                test("id = a안bcd", ()=>{
                    const userId="a안bcd";
                    const result=idRegex(userId);
                    expect(result).toBe(false);
                });
                test("id = ab안cd", ()=>{
                    const userId="ab안cd";
                    const result=idRegex(userId);
                    expect(result).toBe(false);
                });
                test("id = abc안d", ()=>{
                    const userId="abc안d";
                    const result=idRegex(userId);
                    expect(result).toBe(false);
                });
                test("id = abcd안", ()=>{
                    const userId="abcd안";
                    const result=idRegex(userId);
                    expect(result).toBe(false);
                });
            })
        //     test("id = ㅇabcd", ()=>{
        //         const userId="안abcd";
        //         const result=idRegex(userId);
        //         expect(result).toBe(false);
        //     });
        //     test("id = abㅇcd", ()=>{
        //         const userId="abㅇcd";
        //         const result=idRegex(userId);
        //         expect(result).toBe(false);
        //     });
        //     test("id = abcdㅇ", ()=>{
        //         const userId="abcdㅇ";
        //         const result=idRegex(userId);
        //         expect(result).toBe(false);
        //     });
        //     test("id = ㅏabcd", ()=>{
        //         const userId="ㅏabcd";
        //         const result=idRegex(userId);
        //         expect(result).toBe(false);
        //     });
        //     test("id = abㅏcd", ()=>{
        //         const userId="abㅏcd";
        //         const result=idRegex(userId);
        //         expect(result).toBe(false);
        //     });
        //     test("id = abcdㅏ", ()=>{
        //         const userId="abcdㅏ";
        //         const result=idRegex(userId);
        //         expect(result).toBe(false);
        //     });
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