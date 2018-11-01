const carambarName = document.getElementById("carambarName");
let name = document.getElementById("name");
let new_div;
let article_data_filter = [].concat(articles_data);
let category_value = "Aucun";
let edition_value = "Aucun";
let model_value = "Aucun";
let current_width = document.body.clientWidth;

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
    let content = document.getElementById("container-smartphone");
    content.style.display = "none";
}

function search() {
    let search_element = document.getElementById("search");
    search_element.style.display = "none";
    filter();
    document.getElementById("container-smartphone").style.display = "block";    
    display_carambars();
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

function display_carambars() {
    let contents = Array.prototype.slice.call(document.getElementsByClassName("container"));
    contents.forEach(content => {
        content.innerHTML = '';
        let line = document.createElement("div");        
        line.setAttribute("class", "row margin-top");
        for (let i = 0; i < article_data_filter.length; i++) {
            let article = article_data_filter[i];

            let new_wrapper = document.createElement("DIV");
            new_wrapper.setAttribute("class", "col-xl-3 col-lg-4 col-md-6 col-sm-6");

            let new_article = document.createElement("article-component");
            new_article.setAttribute("open","false");
            new_article.setAttribute("id", "article" + i.toString());
            new_article.setAttribute("image", article.image);
            new_article.setAttribute("description", article.desc);
            new_article.setAttribute("name", article.name);

            new_article.addEventListener("click", () => {
                if (!is_smartphone()){                    
                    let popup = document.getElementById("popup");
                    popup.setAttribute("name", article.name);
                    popup.setAttribute("description", article.desc);
                    popup.setAttribute("img", article.image);
                    popup.setAttribute("rating", article.rating);
                    popup.setAttribute("offers", JSON.stringify(article.offers));                    
                }else{         
                    if (new_article.getAttribute("open") === "false"){
                        new_article.setAttribute("rating",article.rating);
                        new_article.setAttribute("offers",JSON.stringify(article.offers));                    
                    }                    
                }              
            });

            let width = document.body.clientWidth;
            
            let modulo = width <= SM ?1 :width <=MD ?2 :width<=LG ?3 :4;
            if (i !== 0 && i % modulo === 0) {
                content.appendChild(line);
                line = document.createElement("DIV");
                line.setAttribute("class", "row margin-top");
            }

            new_wrapper.appendChild(new_article);
            line.appendChild(new_wrapper);
        }
        content.append(line);
    });
}

window.onresize = () => {
    if (!is_smartphone()){
        display_carambars();       
    }    
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
display_carambars();


