const inputText=document.querySelector("#chat textarea");
const inputTextLegth=document.querySelectorAll('#chat .chat_text_length span');

let inputLength=0;
function calcLength() {
    inputTextLegth[0].innerText=inputText.value.length;
}
inputText.onkeyup=calcLength;
calcLength();