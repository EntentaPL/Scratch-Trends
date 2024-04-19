async function _projects(offset){

    if (offset == 16) offset=offset-1;

    const proxy = 'https://corsproxy.io/?';
    const projects = [];
    const url = proxy + 'https://api.scratch.mit.edu/studios/34645019/projects?limit=16&offset=' + (parseInt(offset)+3);

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

    change = $("#projectBox .flex-row div").length;
    status = parseInt(status) + 16;
    const projects = await _projects(status);

    for (let project of projects){

        $(document).ready(function(){

            let block = $(".thumbnail.project").eq(parseInt(status)+parseInt(projects.indexOf(project)));

            let thumbnail = block.find(".thumbnail-image");

            thumbnail.find("img").attr("src", project["image"]);
            thumbnail.attr("href", "/projects/"+project["id"]);

            let author = block.find(".thumbnail-info");

            author.find(".creator-image img").attr("src", project["author"]["author_image"]);
            author.find(".creator-image ").attr("href", "/users/"+project["author"]["author_name"]);
            author.find(".thumbnail-title a").attr("href", "/projects/"+project["id"]).attr("title", project["title"]).text(project["title"]);
            author.find(".thumbnail-title .thumbnail-creator a").attr("href", "/users/"+project["author"]["author_name"]).attr("title", project["author"]["author_name"]).text(project["author"]["author_name"]);

        });

    };
}

function run() {
    
    const lang = $("#frc-language-1088").val();
    const category = $(".sort-mode .form-control").val();
    const len = $("#projectBox .grid .flex-row div").length;

    if (lang == "pl" && category == "trending" && len > 0){
        
        clearInterval(check);
        replace_projects();
        change = $("#projectBox .flex-row div").length;

        setInterval(function(){
            let grid = $("#projectBox .flex-row div").length;
            if (grid != change){
                replace_projects()
            }
        }, 0);
        
    }


}

var change;
var status=-16;
const check = setInterval(run, 0)

/* 

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