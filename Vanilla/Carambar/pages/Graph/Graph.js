currentDocument = document.currentScript.ownerDocument;

class Graph extends HTMLElement {
    constructor() {
        super();        
    }

    connectedCallback() {                   
        this.attachShadow({mode: 'open'});        
        const template = currentDocument.querySelector('#graph-template');
        const instance = template.content.cloneNode(true);
        this.shadowRoot.appendChild(instance);        
    }    
}

customElements.define('graph-page', Graph);