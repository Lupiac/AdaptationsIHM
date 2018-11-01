currentDocument = document.currentScript.ownerDocument;

class LeftNavigation extends HTMLElement {
    constructor() {
        super();        
    }

    connectedCallback() {            	
        const template = currentDocument.querySelector('#left-navigation-template');                
        const instance = template.content.cloneNode(true);
        this.appendChild(instance);        
    }    
}

function open_buy(){
	document.getElementById("buy").style.display = "block";
	document.getElementById("graph").style.display = "none";
}

function open_graph(){
	document.getElementById("graph").style.display = "block";
	document.getElementById("buy").style.display = "none";
}

function change_cursor(element){	
	element.style.cursor = "pointer";
}

customElements.define('left-navigation', LeftNavigation);