import User from "./User.js";
import dayjs from "dayjs";

const errorMessage1="7자 초과 20자 미만의 아이디를 입력해주세요.";
const errorMessage2="아이디에 한글이 포함되면 안됩니다.";
const errorMessage3="두 비밀번호가 서로 같지 않습니다.";
const errorMessage4="7자 초과 20자 미만의 비밀번호를 입력해주세요.";
const errorMessage5="비밀번호에 특수문자를 포함하여야 합니다.";

const username="username";
const userid="useridAAAAA";
const wrongId1="user";
const wrongId2="userAAA한글";
const password="password14#@!";
const wrongPw1="pass@";
const wrongPw2="password";

describe("User", ()=>{
    describe("Constructor", ()=>{
        test(`new User("${username}","${userid}","${password}","${password}")`, ()=>{
            const user=new User(username,userid,password,password);
            expect(user.getUsername).toBe(username);
            expect(user.getUserid).toBe(userid);
            expect(user.getUserpw).toBe(password);
            expect(user.getCreatedDate).toBe(undefined);
        });
        test(`new User("","${username}","${password}","${password}")`, ()=>{
            const user=new User("", userid, password, password);
            expect(user.getUsername).toBe("");
            expect(user.getUserid).toBe(userid);
            expect(user.getUserpw).toBe(password);
            expect(user.getCreatedDate).toBe(undefined);
        });
        test(`new User("","${wrongId1}","${password}","${password}")`, ()=>{
            try {
                const user=new User("", wrongId1, password, password);
            } catch(err) {
                const error=new TypeError(errorMessage1);
                expect(err).toEqual(error);
            }
        });
        test(`new User("","${wrongId2}","${password}","${password}")`, ()=>{
            try {
                const user=new User("", wrongId2, password, password);
            } catch(err) {
                const error=new TypeError(errorMessage2);
                expect(err).toEqual(error);
            }
        });
        test(`new User("","${username}","${password}","${password}@")`, ()=>{
            try {
                const user=new User("", username, password, password+"@");
            } catch(err) {
                const error=new TypeError(errorMessage3);
                expect(err).toEqual(error);
            }
        });
        test(`new User("","${username}","${wrongPw1}","${wrongPw1}")`, ()=>{
            try {
                const user=new User("", username, wrongPw1, wrongPw1);
            } catch(err) {
                const error=new TypeError(errorMessage4);
                expect(err).toEqual(error);
            }
        });
        test(`new User("","${username}","${wrongPw2}","${wrongPw2}")`, ()=>{
            try {
                const user=new User("", username, wrongPw2, wrongPw2);
            } catch(err) {
                const error=new TypeError(errorMessage5);
                expect(err).toEqual(error);
            }
        });
    });
    describe("Set Get", ()=>{
        const user=new User(username,userid,password,password);
        
        test("set/get username", ()=>{
            const newUsername=username+"BB";
            user.setUsername=newUsername;
            expect(user.getUsername).toBe(newUsername);
        });
        test("set/get userid", ()=>{
            const newUserid=userid+"BB";
            user.setUserid=newUserid;
            expect(user.getUserid).toBe(newUserid);
        });
        test("set/get password", ()=>{
            const newPassword=password+"BB";
            user.setUserpw=newPassword;
            expect(user.getUserpw).toBe(newPassword);
        });
        test("set/get createdDate", ()=>{
            const newDate=dayjs().format('YYYY:MM:DD:HH:mm:ss');
            user.setCreatedDate=newDate;
            expect(user.getCreatedDate).toBe(newDate);
        });
    });
    describe("Static Method", ()=>{
        describe("Validators", ()=>{
            describe("Name Length 6 < * <= 20", ()=>{
                test("Name Length 1", ()=>{
                    const name="a";
                    const result=User.idLength(name);
                    expect(result).toBeFalsy();
                });
                test("Name Length 10", ()=>{
                    const name="abcdeabcde";
                    const result=User.idLength(name);
                    expect(result).toBeTruthy();
                });
                test("Name Length 21", ()=>{
                    const name="abcdeabcdeabcdeabcdea";
                    const result=User.idLength(name);
                    expect(result).toBeFalsy();
                });
            });
            describe(`Nmae Regex /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g`, ()=>{
                describe("한글 포함 테스트", ()=>{
                    test("id = 안abcd", ()=>{
                        const userId="안abcd";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                    test("id = a안bcd", ()=>{
                        const userId="a안bcd";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                    test("id = ab안cd", ()=>{
                        const userId="ab안cd";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                    test("id = abc안d", ()=>{
                        const userId="abc안d";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                    test("id = abcd안", ()=>{
                        const userId="abcd안";
                        const result=User.idRegex(userId);
                        expect(result).toBe(false);
                    });
                });
                describe("한글 자음 테스트", ()=>{
                    test("id = ㅇabcd", ()=>{
                        const userId="ㅇabcd";
                        const result=User.idRegex(userId);
                        expect(result).toBeTruthy();
                    });
                    test("id = aㅇbcd", ()=>{
                        const userId="aㅇbcd";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                    test("id = abㅇcd", ()=>{
                        const userId="abㅇcd";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                    test("id = abcㅇd", ()=>{
                        const userId="abcㅇd";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                    test("id = abcdㅇ", ()=>{
                        const userId="abcdㅇ";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                });
                describe("한글 모음 테스트", ()=>{
                    test("id = ㅏabcd", ()=>{
                        const userId="ㅏabcd";
                        const result=User.idRegex(userId);
                        expect(result).toBeTruthy();
                    });
                    test("id = aㅏbcd", ()=>{
                        const userId="aㅏbcd";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                    test("id = abㅏcd", ()=>{
                        const userId="abㅏcd";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                    test("id = abcㅏd", ()=>{
                        const userId="abcㅏd";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                    test("id = abcdㅏ", ()=>{
                        const userId="abcdㅏ";
                        const result=User.idRegex(userId);
                        expect(result).toBeFalsy();
                    });
                });
            });
            describe("Password Compared a === b", ()=>{
                let password="";
                let password2="";
                test("rkawk13@! === rkawk13@!", ()=>{
                    password="rkawk13@!";
                    password2="rkawk13@!";
                    const result=User.passwordCompared(password,password2);
                    expect(result).toBeTruthy();
                });
                test("rkawk13@! === rkawk14@!", ()=>{
                    password="rkawk13@!";
                    password2="rkawk14@!";
                    const result=User.passwordCompared(password,password2);
                    expect(result).toBeFalsy();
                });
            });
            describe("Password Length 6 < * <= 20", ()=>{
                test("Password Length 1", ()=>{
                    const password="a";
                    const result=User.passwordLength(password);
                    expect(result).toBeFalsy();
                });
                test("Password Length 10", ()=>{
                    const password="abcdeabcde";
                    const result=User.passwordLength(password);
                    expect(result).toBeTruthy();
                });
                test("Password Length 21", ()=>{
                    const password="abcdeabcdeabcdeabcdea";
                    const result=User.passwordLength(password);
                    expect(result).toBeFalsy();
                });
            });
            describe(`Password Regex /\W{1,}/`, ()=>{
                let password="";
                test("pw = abcd", ()=>{
                    password="abcd";
                    const result=User.passwordRegex(password);
                    expect(result).toBeFalsy();
                });
                test("pw = @abcd", ()=>{
                    password="@abcd";
                    const result=User.passwordRegex(password);
                    expect(result).toBeTruthy();
                });
                test("pw = ab@cd", ()=>{
                    password="ab@cd";
                    const result=User.passwordRegex(password);
                    expect(result).toBeTruthy();
                });
                test("pw = abc@d", ()=>{
                    password="abc@d";
                    const result=User.passwordRegex(password);
                    expect(result).toBeTruthy();
                });
                test("pw = abcd@", ()=>{
                    password="abcd@";
                    const result=User.passwordRegex(password);
                    expect(result).toBeTruthy();
                });
            });
        });
    });
});