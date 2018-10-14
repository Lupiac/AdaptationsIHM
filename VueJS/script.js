Vue.component('modal', {
    template: '#modal-template'
});

Vue.component('item', {
    template: '#item-template'
});


let title = new Vue({
	el: '#title',
	data: {
		title: 'Tradambar',
	}
});



let market = new Vue({
    el: '#market',
    data: {
        carambars: articles_data,
		showModal: false,
        selectedCarambar: null,
    },
	methods: {
        show: function (c) {
            console.log(this.carambars)
            this.selectedCarambar = c;
            this.showModal = true;
        },
        randomInt: function (c){
            return Math.floor(Math.random() * 15)+3;
        }
    }
});



