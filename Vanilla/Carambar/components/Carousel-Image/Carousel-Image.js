currentDocument = document.currentScript.ownerDocument;

class CarouselImage extends HTMLElement {
    constructor() {
        super();      
        this.number = 0;       
    }

    connectedCallback() {     
        this.attachShadow({mode: 'open'});        	
        const template = currentDocument.querySelector('#carousel-image-component');                
        const instance = template.content.cloneNode(true);
        this.shadowRoot.appendChild(instance);         
        this.setComportement();
    }   

    setComportement(){    
        let left_select = this.shadowRoot.getElementById("left-select");
        let right_select = this.shadowRoot.getElementById("right-select");
        left_select.addEventListener("click",()=>{            
            this.number = this.number === 0 ?2 :this.number - 1;            
            this.appear_video(this.number);               
        });

        right_select.addEventListener("click",()=>{                    
            this.number = (this.number%2 === 0 && this.number !==0) ?0 :this.number + 1;            
            this.appear_video(this.number);                  
        });
    }

    appear_video(number){
        for(let i = 0;i<3;i++){
            if (i === number){
                this.shadowRoot.getElementById("image" + i.toString()).style.display = "block";
            }else{
                this.shadowRoot.getElementById("image" + i.toString()).style.display = "none";
            }
        }
    }
}

customElements.define('carousel-image-component', CarouselImage);