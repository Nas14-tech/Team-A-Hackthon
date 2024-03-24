document.getElementById("studentBtn").addEventListener("click", function(){
    document.getElementById("formContainer").style.display = "block";
    document.getElementById("studentForm").style.display = "block";
    document.getElementById("freshersForm").style.display = "none";

})


document.getElementById("fresherBtn").addEventListener("click", function(){
    document.getElementById("formContainer").style.display = "block";
    document.getElementById("studentForm").style.display = "none";
    document.getElementById("freshersForm").style.display = "block";
})