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
            this.selectedCarambar = c;
            this.showModal = true;
        }
    }
});


Vue.component('modal', {
    template: '#modal-template'
});


