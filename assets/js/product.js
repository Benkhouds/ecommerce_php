import {
    renderMiniCartData
} from './mini-cart.js';
const cartItemsNumber = document.querySelector('.cart .nb_items');
const addToCartBtn = document.querySelector('.product__info .primary-btn');
var product = {};
addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const quantity = parseInt(document.querySelector('.product__info input').value);
    product.counter = quantity;
    console.log(product.price);
    console.log(product.counter);
    product.totalPrice = product.counter * parseInt(product.price);
    addToCart();
})
document.addEventListener('DOMContentLoaded', () => {
    const id = document.URL.slice(document.URL.indexOf('=') + 1);
    console.log(id);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `php/getSingleProduct.php?product_id=${id}`, true);
    xhr.onload = function () {
        if (this.status == 200) {

            if (isJson(this.response)) {
                product = JSON.parse(this.response);
                console.log(product);
                product.price = `${product.price}.00`;
                renderProduct();

            }
            /*  else {
                            //display error; 
                            location.href = "shop.html";
                        } */
        }

    }
    xhr.send();

})

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function renderProduct() {
    const image = document.querySelector('#product img');
    const label = document.querySelector('.product__info h1');
    const origin = document.querySelector('.product__info p.label');
    const price = document.querySelector('.product__info .price');
    image.src = `./assets/images/${product.image}`;
    label.innerHTML = product.label;
    origin.innerHTML = product.origin;
    price.innerHTML = `$${product.price}`;

}

function addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) != undefined ? JSON.parse(localStorage.getItem('cart')) : [];

    if (cart.length != 0) {
        let x = -1;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == product.id) {
                x = i;
                break;
            }
        }
        if (x > -1) {
            cart[x].counter += product.counter;
            product.counter = cart[x].counter;
            cart[x].totalPrice = cart[x].counter * parseInt(product.price);


        } else {
            cart.push(product);
        }
    } else {
        cart.push(product);
    }


    console.log(product);

    localStorage.setItem("cart", JSON.stringify(cart));
    cartItemsNumber.innerHTML = renderMiniCartData(cart);
    if (sessionStorage.getItem("logged") != null) {
        saveInDatabase();
    } else {
        console.log('server problem');
    }

}

function saveInDatabase() {
    const xhr = new XMLHttpRequest();
    const item = {
        id: product.id,
        quantity: product.counter
    };
    xhr.open('POST', 'php/saveCartItem.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.response);
            location.href = "shoppingcart.html";
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("cart_item=" + JSON.stringify(item));
}