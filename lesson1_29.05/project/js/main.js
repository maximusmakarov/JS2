'use strict';

const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;


let app;
app = new Vue({
    el: '#app',
    data: {
        catalogUrl: `/catalogData.json`,
        cartUrl: `/getBasket.json`,
        products: [],
        basket: [],
        filtered: [],
        searchStr: '',
        imgCatalog: `https://placehold.it/200x150`,
        img: `https://placehold.it/100x50`,
        invisible: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        showCart: function () {
            this.invisible = !this.invisible;
        },
        startSearch: function() {
            //allProduct
        },
        addProduct(product){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.basket.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.basket.push(prod);
                        }
                    } else {
                        console.log('error!')
                    }
                })
        },
        remove(product){
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data =>{
                    if (data.result){
                        if(product.quantity > 1){
                            product.quantity--
                        } else {
                            this.basket.splice(this.basket.indexOf(product), 1);
                        }
                    }else{
                        console.log('error!')
                    }
                })
        },
        // filter(){
        //     let regexp = new RegExp(this.searchStr, 'i');
        //     this.filtered = this.products.filter(el => regexp.test(el.product_name));
        // }
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basket.push(el);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    // el.quantity = 1;
                    this.products.push(el);
                    // this.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    // el.quantity = 1;
                    this.products.push(el);
                    // this.filtered.push(el);
                }
            })
    },
    watch: {
        searchStr: function () {
            if (this.searchStr !== '') {
                this.products.forEach(el => {
                    let _name = el.product_name.toLowerCase();
                    let _searchStr = this.searchStr.toLowerCase();
                    // console.log(_name.indexOf(_searchStr) >= 0);
                    if(_name.indexOf(_searchStr) >= 0){
                        el.visible = 'visible';
                    } else {
                        el.visible = 'invisible';
                    }
                });
            }else {
                this.products.forEach(el => {
                    el.visible = 'visible';
                });
            }
        }
    },
    computed: {
        productList: function () {
            let allProduct = this.products;
            return this.products;
        }
    }
});