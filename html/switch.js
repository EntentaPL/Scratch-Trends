import "../modules/jquery.min.js"

function isUpdate() {

    fetch("https://api.github.com/repos/EntentaPL/Scratch-Trends").then(response => response.json()).then(data=> {

        const currentversion = data.default_branch.replace(".release", "");
        const userversion = chrome.runtime.getManifest().version;
        
        if (currentversion != userversion) $("#update_box").css("display", "block")


    })

}

function edit_nav() {

    chrome.storage.local.get("default", function (value) {
        if (value.default =="on") $('a[href|="/explore/projects/all"]').attr("href", "/explore/projects/all?polish_trends");
        else $('a[href|="/explore/projects/all?polish_trends"]').attr("href", "/explore/projects/all");

    });


}

function force_pltrends(noedit) {


    var controller = $("#switcher_pl_trends");
    let div = $("#toggle_pltrends");

    if (controller.hasClass("pl_trends_on")){
        chrome.storage.local.set({force_pltrends: 'off'})

        controller.removeClass("pl_trends_on");
        controller.addClass("pl_trends_off");
        div.css({"background-color" : "rgb(235, 42, 42)", "transition":"0.6s"});
        
    }
    
    else {
        chrome.storage.local.set({force_pltrends: 'on'})

        controller.removeClass("pl_trends_off");
        controller.addClass("pl_trends_on");
        div.css({"background-color":"rgb(35, 211, 85)", "transition":"0.6s"});
    }

    if (noedit != true) {chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function (currentTab) {
            if (currentTab.url.includes("https://scratch.mit.edu/explore/projects/all")) {
                chrome.scripting.executeScript({
                    target : {tabId : currentTab.id},
                    func : () => {window.location.replace("https://scratch.mit.edu/explore/projects/all")}
                })

            }
        })

        
    })};

    
     
}

function default_trends(noedit=false) {

    var controller = $("#switcher_dfl_trends");
    let div = $("#toggle_dfl_trends");

    if (controller.hasClass("dfl_trends_on")){
        chrome.storage.local.set({default: 'off'})

        controller.removeClass("dfl_trends_on");
        controller.addClass("dfl_trends_off");
        div.css({"background-color" : "rgb(235, 42, 42)", "transition":"0.6s"});
        
    }
    
    else {
        chrome.storage.local.set({default: 'on'})

        controller.removeClass("dfl_trends_off");
        controller.addClass("dfl_trends_on");
        div.css({"background-color":"rgb(35, 211, 85)", "transition":"0.6s"});
    }

    if (noedit != true) {chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function (currentTab) {
            if (currentTab.url.includes("https://scratch.mit.edu/explore/projects/all")) {
                chrome.scripting.executeScript({
                    target : {tabId : currentTab.id},
                    func : edit_nav
                })

            }
        })

        
    })};

}

$("#force_pltrends").on("click", force_pltrends);
$("#default_trends").on("click", default_trends);
$("#github").on("click", () => {chrome.tabs.create({ url: 'https://github.com/EntentaPL/Scratch-Trends' });})


chrome.storage.local.get(["default", "force_pltrends"], function (values) {

    if (values.default == "on") default_trends(true);
    else if (values.default == null) chrome.storage.local.set({default: 'off'});

    if (values.force_pltrends == "on") force_pltrends(true);
    else if (values.force_pltrends == null) chrome.storae.localset({force_pltrends : "on"});

})

isUpdate();
