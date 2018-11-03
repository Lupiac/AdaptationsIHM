currentDocument = document.currentScript.ownerDocument;

class Graph extends HTMLElement {
    constructor() {
        super();
        this.number = 0;
    }

    connectedCallback() {
        const template = currentDocument.querySelector('#graph-template');
        const instance = template.content.cloneNode(true);
        this.appendChild(instance);
        this.active_swipe();
        this.listener_indicator_swipe();
        this.setComportement();
    }

    setComportement() {
        let left_select = document.getElementById("left-select");
        let right_select = document.getElementById("right-select");
        left_select.addEventListener("click", () => {
            this.number = this.number === 0 ? 2 : this.number - 1;
            this.appear_video(this.number);
        });

        right_select.addEventListener("click", () => {
            this.number = (this.number % 2 === 0 && this.number !== 0) ? 0 : this.number + 1;
            this.appear_video(this.number);
        });
    }

    appear_video(number){
        for(let i = 0;i<3;i++){
            if (i === number){
                document.getElementById("image" + i.toString()).style.display = "block";
            }else{
                document.getElementById("image" + i.toString()).style.display = "none";
            }
        }
    }

    listener_indicator_swipe() {
        let swipe = document.getElementById("balaye");
        swipe.addEventListener("click", () => {
            let carous = document.getElementById("carous");
            carous.classList.add("movement");
            setTimeout(() => carous.classList.remove("movement"), 1500);
        })
    }

    active_swipe() {
        let touchstartX = 0;
        let touchstartY = 0;
        let touchendX = 0;
        let touchendY = 0;

        const gestureZone = document.getElementById('carous');

        const handleGesture = () => {

            const distance = Math.abs(touchendX - touchstartX);
            if (distance > 20) {
                if (touchendX <= touchstartX) {
                    console.log('Swiped left');
                    $("#carous").carousel("next");		//only work with jquery
                }

                if (touchendX >= touchstartX) {
                    console.log('Swiped right');
                    $("#carous").carousel("prev");
                }
            }
        }
        gestureZone.addEventListener('touchstart', event => {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        gestureZone.addEventListener('touchend', event => {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesture();
        }, false);
    }
}

function active_videos() {
    let medias = document.getElementById("bottom-medias");
    let graphs = document.getElementById("bottom-graphs");
    let medias_container = document.getElementById("medias-container");
    let graphs_container = document.getElementById("graphs-container");
    medias_container.style.display = "block";
    graphs_container.style.display = "none";
    medias.setAttribute("class", "col-6 nopadding center-total active-bottom");
    graphs.setAttribute("class", "col-6 nopadding center-total not-active-bottom");
}

function active_graphs() {
    let medias = document.getElementById("bottom-medias");
    let graphs = document.getElementById("bottom-graphs");
    let medias_container = document.getElementById("medias-container");
    let graphs_container = document.getElementById("graphs-container");
    graphs_container.style.display = "block";
    medias_container.style.display = "none";

    graphs.setAttribute("class", "col-6 nopadding center-total active-bottom");
    medias.setAttribute("class", "col-6 nopadding center-total not-active-bottom");
}

function make_movement() {

}

customElements.define('graph-page', Graph);