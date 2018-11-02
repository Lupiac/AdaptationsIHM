currentDocument = document.currentScript.ownerDocument;

class Article extends HTMLElement {
    constructor() {
        super();
        this.open = false;        
    }

    connectedCallback() {           
        if (!is_smartphone()){                              
            this.set_attributes();
        }      
        this.add_classes();
        this.attachShadow({mode: 'open'});        
        const template = currentDocument.querySelector('#article-template');
        const instance = template.content.cloneNode(true);
        this.shadowRoot.appendChild(instance);
        this.add_event_listener();
        this.render();        
    }

    bring_back_button(){
        const button = this.shadowRoot.getElementById("card__button");
        button.style.display = "block";                        
    }

    static get observedAttributes() {
        return ['rating', 'offers','open'];
    }

    draw_star(link, rating_container) {
        let star = currentDocument.createElement("img");
        star.setAttribute("src", link);
        star.setAttribute("width", "20");
        star.setAttribute("height", "20");
        star.setAttribute("style", "display:inline");
        rating_container.appendChild(star);
    }

    attributeChangedCallback(attr, oldValue, newValue) {  
        if (attr === "open" && newValue==="true" && is_smartphone()){
            let button = this.shadowRoot.getElementById("card__button");         
            button.style.display = "none";
        }        
        if (attr === "rating"){
            let body = this.shadowRoot.getElementById("card__card-body");            
            let rating_container = this.shadowRoot.getElementById("rating");
            rating_container.style.display = "block";
            rating_container.innerHTML = "";                                      
            const rating = newValue;
            for (let i = 0; i < rating; i++) {
                this.draw_star("https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-512.png", rating_container);
            }
            for (let i = 0; i < 5 - rating; i++) {
                this.draw_star("https://cdn4.iconfinder.com/data/icons/sports-technology-and-people/1000/2-01-512.png", rating_container);
            }            
        }
        if (attr === "offers"){            
            const offers = JSON.parse(newValue);            
            let sellers = this.shadowRoot.getElementById("sellers");
            sellers.style.display = "block";
            const sellers_count = offers.length;
            sellers.innerHTML = sellers_count.toString() + " vendeurs à proximité";                
            this.complete_array(offers);
        }
    }

    complete_array(offers){        
        let array = this.shadowRoot.getElementById("array");
        array.style.display = "flex";
        array.innerHTML = "";
        offers.forEach(offer => {
            let element = currentDocument.createElement("li");
            element.setAttribute("class", "list-group-item");
            let row = currentDocument.createElement("div");
            row.setAttribute("class", "row center-row");
            this.generate_name(row, offer);
            this.generate_star_wrapper(row, offer);
            this.generate_euro_wrapper(row, offer);
            this.generate_button_wrapper(row, offer);
            element.appendChild(row);
            array.appendChild(element);
        });         
    }

    generate_wrapper() {
        let wrapper = currentDocument.createElement("div");
        wrapper.setAttribute("class", "text-align-center col-3 nopadding");
        return wrapper;
    }

    generate_long_wrapper() {
        let wrapper = currentDocument.createElement("div");
        wrapper.setAttribute("class", "text-align-center col-4 nopadding");
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
        let button = document.createElement("button");
        button.setAttribute("class", "close btn btn-default btn-lg");
        button.setAttribute("type", "button");        
        let logo = currentDocument.createElement("i");
        logo.setAttribute("class", "fas fa-shopping-cart");
        button.appendChild(logo);
        button_wrapper.appendChild(button);
        row.appendChild(button_wrapper);
    }

    add_event_listener() {        
        this.addEventListener("mouseover", () => this.style.cursor = 'pointer');        
        this.addEventListener("click",()=>{                      
            if (is_smartphone() && this.open){                                
                this.bring_back_button();
                let container = this.shadowRoot.getElementById("card__card-body");   
                this.shadowRoot.getElementById("rating").style.display = "none";                        
                this.shadowRoot.getElementById("sellers").style.display = "none";                
                this.shadowRoot.getElementById("array").style.display = "none";
                this.style.boxShadow = "";                                                         
            }
            this.open = !this.open;
            this.setAttribute("open",this.open.toString());
        });        
    }

    render() {
        const image = this.getAttribute("image");
        const description = this.getAttribute("description");
        const name = this.getAttribute("name");        

        let img = this.shadowRoot.querySelector("#card__img");
        let img_phone = this.shadowRoot.querySelector("#card__img_phone");
        img.setAttribute("src", image);
        img_phone.setAttribute("src",image);

        let desc = this.shadowRoot.querySelector("#card__card-text");
        let desc_phone = this.shadowRoot.querySelector("#card__card-text_phone")
        desc.innerHTML = description;
        desc_phone.innerHTML = description;

        let header = this.shadowRoot.querySelector("#card__card-header");
        let header_phone = this.shadowRoot.querySelector("#card__card-header_phone");
        header.innerHTML = name;
        header_phone.innerHTML = name;
    }

    set_attributes() {
        this.setAttribute("data-toggle","modal");
        this.setAttribute("data-target","#popup");
    }

    add_classes(){        
        this.classList.add('card');
        this.classList.add('text-center');
        if (!is_smartphone()){
            this.classList.add('hvr-grow');        
        }else{
            this.style.marginBottom = "5px";
        }       
    }
}

customElements.define('article-component', Article);