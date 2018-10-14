Vue.component('modal', {
    template: '#modal-template'
});

Vue.component('item', {
    template: '#item-template'
});

Vue.component('modal-confirm', {
    template: '#modal-confirm-template'
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
        showConfirmModal: false,
        selectedCarambar: null,
        selectedOffer: null,
    },
    methods: {
        show: function (c) {
            console.log(this.carambars)
            this.selectedCarambar = c;
            this.showModal = true;
        },
        confirm: function (o) {
            this.selectedOffer = o;
            this.showModal = false;
            this.showConfirmModal = true;
        },
        randomInt: function (c) {
            return Math.floor(Math.random() * 15) + 3;
        }
    }
});



