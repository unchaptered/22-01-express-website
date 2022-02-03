import Post from "./Post.js";
import dayjs from "dayjs";

describe("Post",()=>{
    describe("Constructor", ()=>{
        test(`new Post("title","text")`, ()=>{
            const post=new Post("title", "text");
            expect(post.getPosttitle).toBe("title");
            expect(post.getPosttext).toBe("text");
            expect(post.getPostId).toBe(undefined);
            expect(post.getCreatedDate).toBe(undefined);
            expect(post.getOwnerId).toBe(undefined);
        });
        test(`new Post("title","")`, ()=>{
            try {
                const post=new Post("title","");
            } catch(err) {
                expect(typeof(err)).toBe("object");
            }
        });
        test(`new Post("","text")`, ()=>{
            try {
                const post=new Post("","text");
            } catch(err) {
                expect(typeof(err)).toBe("object");
            }
        });
    });
    describe("Set Get", ()=>{
        const post=new Post("title","text");
        test("set/get Title", ()=>{
            const newTitle="unchaptered";
            post.setPosttitle=newTitle;
            expect(post.getPosttitle).toBe(newTitle);
        });
        test("set/get Text", ()=>{
            const newText="this is texts";
            post.setPosttext=newText;
            expect(post.getPosttext).toBe(newText);
        });
        test("set/get postId", ()=>{
            const newId=12463524123;
            post.setPostId=newId;
            expect(post.getPostId).toBe(newId);
        });
        test("set/get ownerId", ()=>{
            const newId=12463524123;
            post.setOwnerId=newId;
            expect(post.getOwnerId).toBe(newId);
        });
        test("set/get createDate", ()=>{
            const newDate=dayjs().format('YYYY:MM:DD:HH:mm:ss');
            post.setCreatedDate=newDate;
            expect(typeof(post.getCreatedDate)).toBe("string");
        });
    });
    describe("Static Method", ()=>{
        describe("Validators", ()=>{
            describe("Title Length 1 < * <= 50", ()=>{
                test("Title Length 1", ()=>{
                    const name="a";
                    const result=Post.postTitleLength(name);
                    expect(result).toBeFalsy();
                });
                test("Title Length 10", ()=>{
                    const name="abcdeabcde";
                    const result=Post.postTitleLength(name);
                    expect(result).toBeTruthy();
                });
                test("Title Length 55", ()=>{
                    const name="abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde";
                    const result=Post.postTitleLength(name);
                    expect(result).toBeFalsy();
                });
            });
            describe("Text Length 1 < * <= 1000", ()=>{
                test("Text Length 1", ()=>{
                    const text="a";
                    const result=Post.postTitleLength(text);
                    expect(result).toBeFalsy();
                });
                test("Text Length 10", ()=>{
                    const text="abcdeabcde";
                    const result=Post.postTitleLength(text);
                    expect(result).toBeTruthy();
                });
                test("Text Length 1001", ()=>{
                    const text="abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeA";
                    const result=Post.postTitleLength(text);
                    expect(result).toBeFalsy();
                });
            });
        });
    });
});