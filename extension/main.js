async function _projects(offset){


    const projects = [];
    let src = await fetch("https://api.scratch.mit.edu/studios/34645019/projects?limit=40&offset="+offset);
    src = await src.json();

    src.forEach(function (project) {

        projects.push({
            "title":project["title"],
            "id":(project["id"]).toString(),
            "author":{
                "author_name":project["username"],
                "author_id":project["creator_id"],
                "author_image":project["avatar"]["32x32"]
            },
            "image":project["image"]
        });

    })



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

if (lang == "pl" && category == "Wszystko"){

    $("#projectBox .button").remove();
    options.append('<option value="polish_trends">Polskie trendy</option>')
    $(".sort-mode #frc-sort-1088 option[value='trending']").text("Globalne trendy");

    options.on("change", replace_projects)

}