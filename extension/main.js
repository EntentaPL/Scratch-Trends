async function _projects(offset){

    const proxy = 'https://corsproxy.io/?';
    const projects = [];
    const url = proxy + 'https://api.scratch.mit.edu/studios/34645019/projects?limit=40&offset='+offset;

    let src = await fetch(url);
    src = await src.json();

    for (let i in src){
        projects.push({
            "title":src[i]["title"],
            "id":(src[i]["id"]).toString(),
            "author":{
                "author_name":src[i]["username"],
                "author_id":src[i]["creator_id"],
                "author_image":src[i]["avatar"]["32x32"]
            },
            "image":src[i]["image"]
        });
    }

    return projects;

}

async function replace_projects(){

    const projects =(await _projects(3)).concat(await _projects(40));

    const grid = $("#projectBox .grid .flex-row").empty();

    for (let project of projects.reverse()){

        let html = $('<div class="thumbnail project"></div>');

        let thumbnail_link = $("<a></a>").addClass("thumbnail-image").attr("href", "/projects/"+project["id"]);
        let thumbnail_img = $("<img>").attr("src", project["image"]).attr("alt", "");
        html.append(thumbnail_link.append(thumbnail_img));

        let info = $('<div class="thumbnail-info"></div>');

        let author_link = $("<a></a>").addClass("creator-image").attr("href", "/users/"+project["author"]["author_name"]);
        let author_img = $("<img>").attr("src", project["author"]["author_image"]).attr("alt", project["author"]["author_name"]);
        info.append(author_link.append(author_img));


        let title = $('<div class="thumbnail-title"></div>');

        let title_link = $("<a></a>").attr("title", project["title"]).attr("href", "/projects/"+project["id"]).text(project["title"]);
        let title_author = $('<div class="thumbnail-creator"></div>').append($('<a></a>').attr("href", "/users/"+project["author"]["author_name"]).text(project["author"]["author_name"]));
        info.append(title.append(title_link).append(title_author));
        html.append(info);   

        grid.prepend(html)
    };
}


    
const lang = $("#frc-language-1088").val();
const category = $(".sort-controls .active span:first").text()
const options = $(".sort-mode #frc-sort-1088");

console.log(category);

if (lang == "pl" && category == "Wszystko"){

    $("#projectBox .button").remove();
    options.append('<option value="polish_trends">Polskie trendy</option>')
    $(".sort-mode #frc-sort-1088 option[value='trending']").text("Globalne trendy");

    setInterval(function(){
        if (options.val() == "polish_trends"){
            replace_projects();
        }
    } , 0)

}


/* 
'<a href="/explore/projects/tutorials/"><li class=""><span>Samouczki</span></li></a>'
------------------> WARUNKI DZIAŁANIA :: nr 1 <------------------


Całe rozszerzenie będzie działać tylko przy trendach ustawionych na POLSKIE

Alternatywnie można pobrać ciasteczko "scratchlanguage" :

```` const lang = (document.cookie).split("; scratchlanguage=")[1]; ````

Jednak ten plik cookie nie zawsze jest ustawiony, mimo że wybrany jest język polski

------------------> WARUNKI DZIAŁANIA :: nr 2 <------------------


Rozszerzenie ma funkcjonować na TRENDACH, a więc dodatkowo musi zostać wybrana kategoria TRENDY

------------------> WARUNKI DZIAŁANIA :: nr 3 <------------------


Rozszerzenie zanim się uruchomi musi zweryfikować, czy projekty zostały już załadowane

*/