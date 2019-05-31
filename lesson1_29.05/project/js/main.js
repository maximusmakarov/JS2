'use strict';

const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 30},
    {id: 3, title: 'Keyboard', price: 55},
    {id: 4, title: 'Gamepad', price: 75}
], renderProduct = (title, price) => {
    return `
    <div class="d-inline-flex p-2 bd-highlight">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h3 class="card-title">${title}</h3>
                <p class="card-text">${price}</p>
                <a href="#" class="btn btn-primary">Купить</a>
            </div>
        </div>
    </div>
    `
}, renderPage = (list=4) => {
    document.querySelector('.products').innerHTML =
        (list.map(item => renderProduct(item.title, item.price))).join('');
};


renderPage(products);