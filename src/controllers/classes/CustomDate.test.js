import CustomDate from "./CustomDate.js";

describe("CustomDate", ()=>{
    describe("Constructor", ()=>{
        test("new Date()", ()=>{
            try {
                const customDate=new CustomDate();
            } catch(err) {
                expect(typeof(err)).toBe("object");
            }
        });
    });
    describe("Static Method", ()=>{
        describe("Dates", ()=>{
            test("dayjs().format('YYYY:MM:DD:HH:mm:ss')", ()=>{
                const date=CustomDate.getCreatedDate();
                expect(typeof(date)).toBe("string");
            })
        })
    })
});