'use strict';

const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

let getRequest = object => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', object.url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error!' || xhr.statusText)
                } else {
                    resolve(xhr.responseText)
                }
            }
        }
    });
};


// Promise

// let num = a => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if(a){
//                 const b = a + 10;
//                 resolve(b)
//             } else {
//                 reject('Error!')
//             }
//
//         }, 300)
//     })
// }


class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.init();

    }

    init(){
        this._fetchProducts();
        this._render();
        this._totalAmount();
    }

    _fetchProducts(){
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

    productCost(){
        //цена товара
            }
    totalNumber(){
        //получение количества товаров
    }

    _totalAmount(){
        //сумма всех товаров
        const block = document.querySelector('.sum');
        let sum = 0;
        this.allProducts.map(el => sum += el.price);
        block.insertAdjacentText('beforeend', sum);
        // return this.allProducts.reduce((sum, item) => sum + item.price, 0)
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

// class Basket {
//     constructor (container = '.basket'){
//     }
//     productCost(){
//         //получение суммы каждого типа товара
//     }
//     totalNumber(){
//         //получение количества товаров для текущего пользователя
//     }
//     // totalAmount(){
//     //     //сумма всех товаров корзины для текущего пользователя
//     // }
//     getItem(){
//         //получение товара по его pk или id
//     }
//     getItems(){
//         //получение всех товаров корзины
//     }
// }


const products = new ProductsList();
