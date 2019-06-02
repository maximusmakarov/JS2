'use strict';

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.init();
    }
    init(){
        this._receiptProducts();
        this._render();
    }
    _receiptProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 30},
            {id: 3, title: 'Keyboard', price: 55},
            {id: 4, title: 'Gamepad', price: 75}
        ];
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let item of this.data){
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

class ProductItem {
    constructor (product, img = `https://placehold.it/200x150`){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `
        <div class="d-inline-flex p-2 bd-highlight">
            <div class="card">
                <img src="${this.img}" alt="${this.title}" title="${this.title}">
                <div class="card-body">
                    <h3 class="card-title">${this.title}</h3>
                    <p class="card-text">${this.price}</p>
                    <a href="#" class="btn btn-primary">Купить</a>
                </div>
            </div>
        </div>
        `
    }
}

const products = new ProductsList();

// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 30},
//     {id: 3, title: 'Keyboard', price: 55},
//     {id: 4, title: 'Gamepad', price: 75}
// ];
// const renderProduct = (title, price, img = `https://placehold.it/200x150`) => {
//     return `
//     <div class="d-inline-flex p-2 bd-highlight">
//         <div class="card">
//             <img src="${img}" alt="${title}" title="${title}">
//             <div class="card-body">
//                 <h3 class="card-title">${title}</h3>
//                 <p class="card-text">${price}</p>
//                 <a href="#" class="btn btn-primary">Купить</a>
//             </div>
//         </div>
//     </div>
//     `
// };
// const renderPage = list => {
//     for (let item of list){
//             document.querySelector('.products').insertAdjacentHTML
//             ('beforeend', renderProduct(item.title, item.price));
//         }
// };
//
//
// renderPage(products);