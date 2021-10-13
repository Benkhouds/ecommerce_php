import { renderMiniCartData } from './mini-cart.js';
import {clickbaitHtml, articleHtml} from './htmlParts.js';
const cartItemsNumber = document.querySelector('.cart .nb_items');
const coffeeContainer = document.querySelector(".coffee-container");
const gearContainer = document.querySelector(".gear-container");


document.addEventListener('DOMContentLoaded', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/getProducts.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.response);
            const data = JSON.parse(this.response);
            if(!data.error){
                renderProducts(data);
            }
            setTimeout(() => {
                saveCartItemsOnClick(Array.from(coffeeContainer.children));
            }, 200);
        }
    }
    xhr.send();
});

function renderProducts(data) {
    let articles = "";
    const cartArray = JSON.parse(localStorage.getItem('cart')) != undefined ? JSON.parse(localStorage.getItem('cart')) : [];
    data.forEach((product, index) => {
        let counter = 0;
        cartArray.forEach((item) => {
            if (item.id == product[0]) {
                counter = item.counter;
            }
        })
        const productElement = articleHtml(product[0],product[6],counter, product[4], product[1], product[2], product[7]);
        if (index != 3) {
            articles += productElement;
        } else {
            articles += (productElement +clickbaitHtml);
        }
    });
    coffeeContainer.innerHTML = articles;

}



function saveCartItemsOnClick(elements) {

    elements.forEach((elem, index) => {
        if (index != 4) {
            elem.children[1].addEventListener('click', (e) => {
                let cart = JSON.parse(localStorage.getItem('cart')) != undefined ? JSON.parse(localStorage.getItem('cart')) : [];
                const imgPath = e.target.parentElement.children[0].children[0].src;
                const image = imgPath.slice(imgPath.search('images/') + 7, imgPath.length);
                const label = e.target.parentElement.children[0].children[1].children[1].textContent;
                const price = e.target.parentElement.children[0].children[1].children[2].textContent.slice(1);
                const id = e.target.parentElement.dataset.id;
                const stock = e.target.parentElement.dataset.stock;
                const counter = e.target.parentElement.dataset.count = parseInt(e.target.parentElement.dataset.count) + 1;
                const totalPrice = parseInt(price) * +counter;
                const product = {
                    id,
                    stock,
                    label,
                    price,
                    image,
                    counter,
                    category: "coffee",
                    totalPrice

                };
                if (cart.length != 0) {
                    let x = -1;
                    for (let i = 0; i < cart.length; i++) {
                        if (cart[i].id == product.id) {
                            x = i;
                            break;
                        }
                    }
                    x > -1 ?  cart.splice(x,1,product) : cart.push(product);
        
                } else {
                    cart.push(product);
                }
                console.log(product)
                localStorage.setItem("cart", JSON.stringify(cart));
                cartItemsNumber.innerHTML = renderMiniCartData(cart);
                if (sessionStorage.getItem("logged") != null) {
                    saveInDatabase(product);
                } else {
                    console.log('server problem');
                }

            });
        }
    });

}


function saveInDatabase(product) {
    const xhr = new XMLHttpRequest();
    const item = {
        id: product.id,
        quantity: product.counter
    };
    xhr.open('POST', 'php/saveCartItem.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.response);
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("cart_item=" + JSON.stringify(item));
}