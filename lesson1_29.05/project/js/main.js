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
        visible: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        showCart: function () {
            this.visible = !this.visible;
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
        filter(){
            let regexp = new RegExp(this.searchStr, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
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
                    this.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    // el.quantity = 1;
                    this.products.push(el);
                    this.filtered.push(el);
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
                        el.visible = 'visible';
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

// let getRequest = object => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', object.url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     reject('Error!' || xhr.statusText)
//                 } else {
//                     resolve(xhr.responseText)
//                 }
//             }
//         };
//         xhr.send()
//     });
// };

// class List {
//     constructor(url, container){
//         this.container = container;
//         this.url = url;
//         this.data = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }
//
//     getJson(url){
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => console.log(error))
//     }
//
//     handleData(data){
//         this.data = [...data];
//         this.render();
//     }
//
//     getItem(id){
//         return this.allProducts.find(el => el.id_product === id);
//     }
//
//     render(){
//         const block = document.querySelector(this.container);
//         for (let item of this.data){
//             const product = new lists[this.constructor.name](item);
//             this.allProducts.push(product);
//             block.insertAdjacentHTML('beforeend', product.render());
//         }
//     }
//
//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(el => regexp.test(el.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('visible');
//             } else {
//                 block.classList.remove('visible')
//             }
//         })
//     }
//
//     // _totalAmount(){
//     //     //сумма всех товаров
//     //     const block = document.querySelector('.sum');
//     //     let sum = 0;
//     //     this.allProducts.map(el => sum += el.price);
//     //     block.insertAdjacentText('beforeend', sum);
//     //     // return this.allProducts.reduce((sum, item) => sum + item.price, 0)
//     // }
//
//     _init(){
//         return false;
//     }
//
// }
//
// class Item {
//     constructor(el, img = `https://placehold.it/200x150`){
//         this.id_product = el.id_product;
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.img = img;
//     }
//     render(){
//         return `
//         <div class="product-item" data-id="${this.id_product}">
//             <div class="card">
//                 <img src="${this.img}" alt="${this.product_name}" title="${this.product_name}">
//                 <div class="card-body">
//                     <h3 class="card-title">${this.product_name}</h3>
//                     <p class="card-text">${this.price}</p>
//                     <button class="buy-btn" data-id="${this.id_product}">Купить</button>
//                 </div>
//             </div>
//         </div>
//         `
//     }
// }
//
// class ProductsList extends List{
//     constructor(basket, url ='/catalogData.json', container = '.products'){
//         super(url, container);
//         this.basket = basket;
//         this.getJson()
//             .then(data => this. handleData(data));
//
//     }
//
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('buy-btn')){
//                 let id = +e.target.dataset['id'];
//                 this.basket.addProduct(this.getItem(id));
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value);
//         })
//     }
//
// }
//
//
// class ProductItem extends Item{}
//
// class Basket extends List{
//     contents;
//     constructor(url='/getBasket.json', container = '.cart-block'){
//         super(url, container);
//         this.getJson()
//             .then(data => this.handleData(data.contents));
//     }
//
//     addProduct(product){
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if(data.result){
//                     let find = this.allProducts.find(el => el.id_product === product.id_product);
//                     if(find){
//                         find.quantity++;
//                         Basket._updateBasket(find);
//                     } else {
//                         let prod = Object.assign({quantity: 1}, product);
//                         this.data = [prod];
//                         this.render();
//                     }
//                 } else {
//                     console.log('Error');
//                 }
//             })
//     }
//
//     static _updateBasket(product){
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector(`.product-quantity`).textContent = `Quantity: ${product.quantity}`;
//         block.querySelector(`.product-price`).textContent = `$${product.quantity*product.price}`;
//     }
//
//     removeProduct(element) {
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result) {
//                     let prodId = +element.dataset['id'];
//                     let find = this.allProducts.find(el => el.id_product === prodId);
//                     if (find.quantity > 1) {
//                         find.quantity--;
//                         Basket._updateBasket(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart-item[data-id="${prodId}"]`).remove();
//                     }
//                 } else {
//                     console.log('Error');
//                 }
//             })
//     }
//
//     _init(){
//         document.querySelector(this.container).addEventListener('click', event => {
//             if(event.target.classList.contains('del-btn')){
//                 this.removeProduct(event.target);
//             }
//         });
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('visible');
//         })
//     }
// }
//
// class BasketItem extends Item {
//     constructor(el, img = `https://placehold.it/50x100`){
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//
//     render(){
//         return `<div class="cart-item" data-id="${this.id_product}">
//                 <div class="product-bio">
//                 <img src="${this.img}" alt="Some image">
//                 <div class="product-desc">
//                 <p class="product-title">${this.product_name}</p>
//                 <p class="product-quantity">Quantity: ${this.quantity}</p>
//                 <p class="product-single-price">${this.price} each</p>
//                 </div>
//                 </div>
//                 <div class="right-block">
//                 <p class="product-price">${this.quantity*this.price}</p>
//                 <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                 </div>
//                 </div>`
//     }
// }
//
// const lists = {
//     ProductsList: ProductItem,
//     Basket: BasketItem
// };
//
// const basket = new Basket();
// const products = new ProductsList(basket);
//
// products.getJson(`getProducts.json`).then(data => products.handleData(data));
