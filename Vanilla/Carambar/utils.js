const SM = 560;
const MD = 992;
const LG = 1200;

function is_smartphone(){	
	let width = document.body.clientWidth;
	return width <= SM;
}