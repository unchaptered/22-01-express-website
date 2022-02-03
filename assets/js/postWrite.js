const inputText=document.querySelector(".form-display textarea");
const inputTextLegth=document.querySelectorAll('.form-display .post_text_length span');

let inputLength=0;
function calcLength() {
    inputLength=inputText.value.length;
    inputTextLegth[0].innerText=(inputLength===1000) ? "1,000" : inputLength;
}
inputText.onkeyup=calcLength;
calcLength();