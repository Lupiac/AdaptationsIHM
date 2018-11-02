currentDocument = document.currentScript.ownerDocument;

class Graph extends HTMLElement {
    constructor() {
        super();        
    }

    connectedCallback() {                             
        const template = currentDocument.querySelector('#graph-template');
        const instance = template.content.cloneNode(true);
        this.appendChild(instance);
        this.active_swipe();         
    }    

    active_swipe(){
    	let touchstartX = 0;
		let touchstartY = 0;
		let touchendX = 0;
		let touchendY = 0;

		const gestureZone = document.getElementById('carous');		

		const handleGesture = () => {

			const distance = Math.abs(touchendX-touchstartX);
			if (distance>20){
				if (touchendX <= touchstartX ) {
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

function active_videos(){
	let videos = document.getElementById("bottom-videos");
	let graphs = document.getElementById("bottom-graphs");
	let video_container = document.getElementById("video-container");	
	video_container.style.display = "block";
	videos.setAttribute("class","col-6 nopadding center-total active-bottom");
	graphs.setAttribute("class","col-6 nopadding center-total not-active-bottom");
}

function active_graphs(){
	let videos = document.getElementById("bottom-videos");
	let graphs = document.getElementById("bottom-graphs");	
	let video_container = document.getElementById("video-container");	
	video_container.style.display = "none";

	graphs.setAttribute("class","col-6 nopadding center-total active-bottom");
	videos.setAttribute("class","col-6 nopadding center-total not-active-bottom");
}


customElements.define('graph-page', Graph);