import "../modules/jquery.min.js"

$("#switcher").on("click", function change() {

    let controller = $("#switcher");
    let div = $("#toggle");
    let p = $("#status_text");

    if (controller.hasClass("on")){
        chrome.storage.local.set({"status":"off"});

        controller.removeClass("on");
        controller.addClass("off");
        div.css({"background-color" : "rgb(235, 42, 42)", "transition":"0.6s"});
        p.text("Rozszerzenie nieaktywne");
    }
    
    else {
        chrome.storage.local.set({"status":"on"})

        controller.removeClass("off");
        controller.addClass("on");
        div.css({"background-color":"rgb(35, 211, 85)", "transition":"0.6s"});
        p.text("Rozszerzenie aktywne");
    }
})

$(".refer").on("click", function(){
    chrome.tabs.create({active: true, url: "https://github.com/EntentaPL/Scratch-Trends/"});
})

$("#switcher").click();