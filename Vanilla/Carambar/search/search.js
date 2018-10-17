const carambarName = document.getElementById("carambarName");
let name = document.getElementById("name");
let new_div;
let article_data_filter = [].concat(articles_data);
let category_value = "Aucun";
let edition_value = "Aucun";
let model_value = "Aucun";

function fill_carambars_options() {
    if (article_data_filter.length > 0) {
        new_div = document.createElement("DIV");
        name.appendChild(new_div);
        article_data_filter.forEach(article => {
            let new_content = document.createElement("DIV");
            new_content.setAttribute("class", "proposition");
            new_content.innerHTML = article.name;
            new_content.addEventListener("mouseover", e => {
                e.target.style.backgroundColor = 'darkgray';
                e.target.style.cursor = 'pointer';
            });
            new_content.addEventListener("mouseout", e => {
                e.target.style.backgroundColor = 'white';
            });
            new_content.addEventListener("mousedown", () => {
                carambarName.value = article.name;
                name.removeChild(new_div);
                new_div = null;
                article_data_filter = [article];
                display_carambars();
            });
            new_div.appendChild(new_content);
        });
        display_carambars();
    }
}

function display_search() {
    let search_element = document.getElementById("search");
    search_element.style.display = "block";
    let content = document.getElementById("content2");
    content.style.display = "none";
}

function search() {
    let search_element = document.getElementById("search");
    search_element.style.display = "none";
    let content = document.getElementById("content2");
    content.style.display = "flex";
    filter();
    display_carambars_2();
}

function filter() {
    article_data_filter = articles_data.filter(article => (article.category === category_value || category_value === "Aucun")
        && (article.edition === edition_value || edition_value === "Aucun")
        && (article.model === model_value || model_value === "Aucun"));
    display_carambars();
}


function change_category_value(elem) {
    const index = elem.options.selectedIndex;
    category_value = elem.options[index].value;
    console.log(category_value);
}

function filter_by_category(elem) {
    change_category_value(elem);
    filter();
}

function change_edition_values_martphone(elem) {
    edition_value = elem.value;
}

function change_edition_value(elem) {
    const index = elem.options.selectedIndex;
    edition_value = elem.options[index].value;
}

function filter_by_edition(elem) {
    change_edition_value(elem);
    filter();
}

function change_model_value(elem) {
    const index = elem.options.selectedIndex;
    model_value = elem.options[index].value;
}

function filter_by_model(elem) {
    change_model_value(elem);
    filter();
}

function mouse_over_menu_content(elem) {
    elem.style.backgroundColor = "green";
    elem.style.cursor = 'pointer';
}

function mouse_out_menu_content(elem) {
    elem.style.backgroundColor = "rgb(66, 185, 131)";
}

function display_carambars_2() {
    let content = document.getElementById("content2");
    content.innerHTML = '';
    let line = document.createElement("DIV");
    line.setAttribute("class", "line");
    for (let i = 0; i < article_data_filter.length; i++) {
        let article = article_data_filter[i];
        let new_article = document.createElement("DIV");

        new_article.setAttribute("class", "article2 card");
        new_article.innerHTML = "<img class='img_article' src='../carambar.jpg' width='100px' height='100px'/>";
        new_article.innerHTML += "<p class='name_article'>" + article.name + "</p>";
        new_article.innerHTML += "<p class='desc-article'>" + article.desc + "</p>";
        new_article.innerHTML += "<div class='button-article' onmouseout=\"mouse_out_menu_content(this)\" onmouseover=\"mouse_over_menu_content(this)\">" + "Voir les offres" + "</div>";
        if (i !== 0 && i % 2 === 0) {
            content.appendChild(line);
            line = document.createElement("DIV");
            line.setAttribute("class", "line");
        }
        line.appendChild(new_article);
    }
    content.append(line);
}

function display_carambars() {
    let content = document.getElementById("content");
    content.innerHTML = '';
    let line = document.createElement("DIV");
    line.setAttribute("class", "line");
    for (let i = 0; i < article_data_filter.length; i++) {
        let article = article_data_filter[i];
        let new_article = document.createElement("DIV");

        new_article.setAttribute("class", "article card");
        new_article.innerHTML = "<img class='img_article' src='../carambar.jpg' width='100px' height='100px'/>";
        new_article.innerHTML += "<p class='name_article'>" + article.name + "</p>";
        new_article.innerHTML += "<p class='desc-article'>" + article.desc + "</p>";
        new_article.innerHTML += "<div class='button-article' onmouseout=\"mouse_out_menu_content(this)\" onmouseover=\"mouse_over_menu_content(this)\">" + "Voir les offres" + "</div>";
        if (i !== 0 && i % 4 === 0) {
            content.appendChild(line);
            line = document.createElement("DIV");
            line.setAttribute("class", "line");
        }
        line.appendChild(new_article);
    }
    content.append(line);
}

carambarName.addEventListener("focusout", () => {
    name.removeChild(new_div);
    new_div = null;
});


carambarName.onkeyup = () => {
    if (name.children.length > 0 && new_div) {
        name.removeChild(new_div);
        new_div = null;
    }
    article_data_filter = [];
    const word = carambarName.value.toLowerCase();
    article_data_filter = articles_data
        .filter(article => article.name.toLowerCase().includes(word));
    if (word.length > 0) {
        fill_carambars_options();
    } else {
        article_data_filter = [].concat(articles_data);
        display_carambars();
    }
};

carambarName2.onkeyup = () => {
    if (name.children.length > 0 && new_div) {
        name.removeChild(new_div);
        new_div = null;
    }
    article_data_filter = [];
    const word = carambarName.value.toLowerCase();
    article_data_filter = articles_data
        .filter(article => article.name.toLowerCase().includes(word));
    if (word.length > 0) {
        fill_carambars_options();
    } else {
        article_data_filter = [].concat(articles_data);
        display_carambars();
    }
};

display_carambars();


