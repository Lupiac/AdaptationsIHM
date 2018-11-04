Vue.component('modal', {
    template: '#modal-template'
});

Vue.component('item', {
    template: '#item-template'
});

Vue.component('mobile-item', {
    template: '#mobile-item-template'
});

Vue.component('modal-confirm', {
    template: '#modal-confirm-template'
});


let app = new Vue({
    el: '#app',
    data: {
        carambars: articles_data,
        showModal: false,
        showDetailsModal: false,
        showConfirmModal: false,
        selectedCarambar: null,
        selectedOffer: null,
        searchInput: null,
        userlogged: true,
        detailsContent: ['stats','history','map']
    },
    methods: {
        show: function (c) {
            if(this.showDetailsModal) this.showDetailsModal = false;
            this.selectedCarambar = c;
            this.showModal = true;
        },
        detail: function(c){
            this.selectedCarambar = c;
            this.toggleDetails('all')
            this.showDetailsModal = true;
        },
        confirm: function (o) {
            this.selectedOffer = o;
            this.showModal = false;
            this.showConfirmModal = true;
        },
        randomInt: function (c) {
            return Math.floor(Math.random() * 15) + 3;
        },
        search: function () {
            this.carambars = articles_data.filter(c => c.name.toLowerCase().includes(this.searchInput.toLowerCase()))
        },
        filter: function (i){
            if(i === "all") this.carambars = articles_data;
            else this.carambars = articles_data.filter(c => c.category === i || c.size === i)
        },
        toggleDetails(c){
            if(c === 'all') this.detailsContent = ['stats','history','map'];
            else this.detailsContent = [c]
        }
    }
});



