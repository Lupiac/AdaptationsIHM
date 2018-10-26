let currentDocument = document.currentScript.ownerDocument;

class Popup extends HTMLElement {
    constructor() {
        super();
        this.initial_state = true;
    }

    connectedCallback() {
        this.classList.add('modal');
        this.classList.add('fade');
        this.tabIndex = -1;
        this.setAttribute('role', 'dialog');
        this.setAttribute('aria-labelledby', 'myModalLabel');
        this.setAttribute('aria-hidden', 'true');
        const template = currentDocument.querySelector('#pop-up-template');
        const instance = template.content.cloneNode(true);
        this.appendChild(instance);
    }

    display_none_first_version(){
        let body_v1 = currentDocument.getElementById("body-v1");
        let body_v2 = currentDocument.getElementById("body-v2");
        body_v1.setAttribute("style","display:none");
        body_v2.setAttribute("style","display:none");
    }

    display_first_version(){
        let body_v1 = currentDocument.getElementById("body-v1");
        let body_v2 = currentDocument.getElementById("body-v2");
        body_v1.setAttribute("style","display:flex");
        body_v2.setAttribute("style","display:flex");
    }

    click_to_delete_tab(button, user) {
        button.addEventListener("click", () => {
            let body = currentDocument.getElementById("body");
            this.display_none_first_version();
            currentDocument.getElementById("exampleModalLabel").innerHTML = "Confirmation de rendez-vous avec " + user;
            let row = currentDocument.createElement("div");
            row.setAttribute("class", "row center");
            row.setAttribute("id","row-download");
            let left_wrapper = currentDocument.createElement("div");
            left_wrapper.setAttribute("class", "row-modal col-8");
            let text = currentDocument.createElement("div");
            text.setAttribute("class", "text-align-center");
            text.innerHTML = "Téléchargez l'application pour vous laisser guider jusqu'au bas des blocs";
            left_wrapper.appendChild(text);
            let bot_wrapper = currentDocument.createElement("div");
            bot_wrapper.setAttribute("class", "center flex");
            bot_wrapper.innerHTML = "<img src=\"https://h24-original.s3.amazonaws.com/120041/22642034-Wrt29.jpg\" height=\"100px\"/>";
            bot_wrapper.innerHTML += "<img src=\"http://azonmobile.com/cms/system_direct_files/qrcodes/b76170dabe4189bdd2acf273224955fb432906f8f3bad3907b38451f2dd7949e.png\" height=\"100px\"/>";
            left_wrapper.appendChild(bot_wrapper);
            let right_wrapper = currentDocument.createElement("div");
            right_wrapper.setAttribute("class", "col-4");
            right_wrapper.innerHTML = "<img class=\"fake-map\" src=\"https://iphonesoft.fr/images/_122012/google_maps_donnees_localisation.jpg\"/>";
            row.appendChild(left_wrapper);
            row.appendChild(right_wrapper);
            body.appendChild(row);
        });
    }

    static get observedAttributes() {
        return ['name', 'description', 'img', 'rating', 'offers'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        let row_download = currentDocument.getElementById("row-download");
        if (row_download){
            currentDocument.getElementById("body").removeChild(row_download);
            this.display_first_version();
        }
        if (attr === "name") {
            currentDocument.getElementById("exampleModalLabel").innerHTML = "Carambar " + newValue;
        }
        if (attr === "description") {
            currentDocument.getElementById("description").innerHTML = newValue;
        }
        if (attr === "img") {
            let img = currentDocument.getElementById("img");
            img.setAttribute("src", newValue);
        }
        if (attr === "rating") {
            let rating_container = document.getElementById("rating-container");
            rating_container.innerHTML = "";
            const rating = newValue;
            for (let i = 0; i < rating; i++) {
                this.draw_star("https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-512.png", rating_container);
            }
            for (let i = 0; i < 5 - rating; i++) {
                this.draw_star("https://cdn4.iconfinder.com/data/icons/sports-technology-and-people/1000/2-01-512.png", rating_container);
            }
        }
        if (attr === "offers") {
            let offers = JSON.parse(newValue);
            const offers_length = offers.length;
            currentDocument.getElementById("sellers").innerHTML = offers_length.toString() + " vendeurs à proximité";
            this.complete_array(offers);
        }
    }

    generate_wrapper() {
        let wrapper = currentDocument.createElement("div");
        wrapper.setAttribute("class", "text-align-center col-2");
        return wrapper;
    }

    generate_long_wrapper() {
        let wrapper = currentDocument.createElement("div");
        wrapper.setAttribute("class", "text-align-center col-6");
        return wrapper;
    }

    generate_name(row, offer) {
        let name_wrapper = this.generate_wrapper();
        let name = currentDocument.createElement("div");
        name.innerHTML = offer.user;
        name_wrapper.appendChild(name);
        row.appendChild(name_wrapper);
    }

    generate_star_wrapper(row, offer) {
        let star_wrapper = this.generate_long_wrapper();
        let position = currentDocument.createElement("div");
        position.innerHTML = "<i class=\"fas fa-map-marker-alt\"></i> ";
        position.innerHTML += "A 10 km de vous.";
        star_wrapper.appendChild(position);
        let star = currentDocument.createElement("div");
        star.innerHTML = "<i class=\"fas fa-star\"></i> ";
        star.innerHTML += "Note : " + offer.rating.toString();
        star_wrapper.appendChild(star);
        row.appendChild(star_wrapper);
    }

    generate_euro_wrapper(row, offer) {
        let euro_wrapper = this.generate_wrapper();
        let euro = currentDocument.createElement("div");
        euro.setAttribute("class", "text-align-center");
        euro.innerHTML = offer.price.toString() + " € / g";
        euro_wrapper.appendChild(euro);
        row.appendChild(euro_wrapper);
    }

    generate_button_wrapper(row, offer) {
        let button_wrapper = this.generate_wrapper();
        button_wrapper.setAttribute("class", "offer-action");
        let button = currentDocument.createElement("button");
        button.setAttribute("class", "close btn btn-default btn-lg");
        button.setAttribute("type", "button");
        this.click_to_delete_tab(button, offer.user);
        let logo = currentDocument.createElement("i");
        logo.setAttribute("class", "fas fa-shopping-cart");
        button.appendChild(logo);
        button_wrapper.appendChild(button);
        row.appendChild(button_wrapper);
    }

    complete_array(offers) {
        let array = currentDocument.getElementById("tab");
        array.innerHTML = "";
        array.setAttribute("style", "margin-top:10px");
        offers.forEach(offer => {
            let element = currentDocument.createElement("li");
            element.setAttribute("class", "list-group-item");
            let row = currentDocument.createElement("div");
            row.setAttribute("class", "row center");
            this.generate_name(row, offer);
            this.generate_star_wrapper(row, offer);
            this.generate_euro_wrapper(row, offer);
            this.generate_button_wrapper(row, offer);
            element.appendChild(row);
            array.appendChild(element);
        });
    }

    draw_star(link, rating_container) {
        let star = currentDocument.createElement("img");
        star.setAttribute("src", link);
        star.setAttribute("width", "20");
        star.setAttribute("height", "20");
        star.setAttribute("style", "display:inline");
        rating_container.appendChild(star);
    }
}

customElements.define('pop-up', Popup);