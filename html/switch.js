import "../modules/jquery.min.js"

$(".refer").on("click", function(){
    chrome.tabs.create({active: true, url: "https://github.com/EntentaPL/Scratch-Trends/"});
})

$("#switcher").click();