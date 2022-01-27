const inputLists=document.querySelectorAll(".form-display input");

const modifyBtn=document.getElementById("form_modify");
const submitBtn=document.getElementById("form_submit");

modifyBtn.addEventListener("click", (event)=>{
    submitBtn.style.display="initial";
    inputLists.forEach(element=>element.disabled=false);
});
submitBtn.addEventListener("click", ()=>{
});