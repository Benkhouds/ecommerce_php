const cartIcon = document.querySelector('.cart');
const miniCart = document.querySelector('#minicart-wrapper');
const closeIcon = document.querySelector('#minicart-wrapper .close');
const veil = document.querySelector('.veil');
const cartNumber = document.querySelector('.cart .nb_items');
const container = document.querySelector(".coffee-container");


window.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) != undefined ? JSON.parse(localStorage.getItem('cart')) : [];
    cartNumber.innerHTML = renderMiniCartData(cart);



})
cartIcon.onclick = () => openCart();
closeIcon.onclick = () => closeCart();
veil.onclick = () => closeCart();

function openCart() {
    document.body.style.overflow = "hidden";
    miniCart.classList.add('active');
    veil.style.display = 'block';
    setTimeout(() => {
        veil.style.opacity = 1;
    }, 50);
}

function closeCart() {
    miniCart.classList.remove('active');
    veil.style.opacity = 0;
    setTimeout(() => {
        document.body.style.overflowY = "visible";
        veil.style.display = 'none';
    }, 300);
}

function deleteItem(cart) {
    const items = document.querySelector('.minicart-items');
    Array.from(items.children).forEach((item) => {

        item.children[3].children[0].addEventListener('click', (e) => {
            e.preventDefault();
            cart.forEach((savedItem, index) => {
                if (savedItem.id == item.dataset.id) {
                    cart.splice(index, 1);
                    console.log(cart);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    cartNumber.innerHTML = parseInt(cartNumber.innerHTML) - item.dataset.quantity;
                    item.remove();
                    resetProductCounter(savedItem.id);
                    if (sessionStorage.getItem("logged") != null) {
                        deleteItemFromDatabase(savedItem.id);
                    }
                }
            })
        });
    })
}

function renderMiniCartData(cart) {
    const miniCartItems = document.querySelector('.minicart-items');
    let list = '';
    let item = '';
    let quantity = 0;

    cart.forEach((elem) => {

        quantity += elem.counter;

        if (elem.counter > 1) {
            item = `
            <div class="item" data-id="${elem.id}" data-quantity="${elem.counter}">
                <img src="${elem.image}" alt="">
                <h1>${elem.label}</h1>
                <p class="price">$${elem.price} * ${elem.counter}</p>
                <div class="modify">
                    <a href="#" class="fancy-link">Remove</a>
                    &nbsp;/&nbsp;
                    <a href="shoppingcart.html" class="fancy-link">Edit</a>
                </div>
            </div>`;
        } else {
            item = `
            <div class="item" data-id="${elem.id}" data-quantity="${elem.counter}">
                <img src="${elem.image}" alt="">
                <h1>${elem.label}</h1>
                <p class="price">$${elem.price}</p>
                <div class="modify">
                    <a href="#" class="fancy-link">Remove</a>
                    &nbsp;/&nbsp;
                    <a href="shoppingcart.html" class="fancy-link">Edit</a>
                </div>
            </div>`;
        }
        list += item;
    });
    miniCartItems.innerHTML = list;
    deleteItem(cart);
    return quantity;
}


export {
    renderMiniCartData
}


function deleteItemFromDatabase(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/deleteCartItem.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            if (this.response == "success") {
                console.log("deleted");
            } else {
                console.log(this.response);
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("item_id=" + id);

}

function resetProductCounter(id) {
    const elements = container.children;
    Array.from(elements).forEach((elem) => {
        if (elem.dataset.id == id) {

            elem.dataset.count = 0;
        }
    })
}