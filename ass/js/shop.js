import {
    renderMiniCartData
} from './mini-cart.js';

const cartItemsNumber = document.querySelector('.cart .nb_items');
const container = document.querySelector(".coffee-container");
document.addEventListener('DOMContentLoaded', () => {


    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/getProducts.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            const data = JSON.parse(this.response);
            renderProducts(data);
            setTimeout(() => {
                saveCartItemsOnClick(Array.from(container.children));
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

        if (index != 3) {
            articles +=
                `<article class="coffee__product" data-id="${product[0]}" data-stock="${product[6]}" data-count="${counter}">
                <figure>
                    <img src="${product[4]}" alt="product">
                    <figcaption>
                        <span class="label">${product[1]}</span>
                        <h3>${product[2]}</h3>
                        <span class="label">$${product[7]}.00</span>
                    </figcaption>
                </figure>
                <button class="primary-btn">Add to cart</button>
                <a href="product.html?product_id=${product[0]}"></a> 
            </article>`;
        } else {
            articles +=
                `<article class="coffee__product" data-id="${product[0]}" data-stock="${product[6]}" data-count="${counter}">
                <figure>
                    <img src="${product[4]}" alt="product">
                    <figcaption>
                        <span class="label">${product[1]}</span>
                        <h3>${product[2]}</h3>
                        <span class="label">$${product[7]}.00</span>
                    </figcaption>
                </figure>
                <button class="primary-btn">Add to cart</button>
                <a href="product.html?product_id=${product[0]}"></a> 
            </article>
                <article class="clickbait">
                <figure>
                    <img src="assets/images/product5.webp" alt="product">
                    <figcaption>
                        <h2>Dial in at Home</h2>
                        <p>
                            Brewing beautiful coffee at home isn’t neuroscience.<br>
                            All you need is the right equipment and a little know-how.
                        </p>
                        <a href="#gear-intro" class="fancy-link">Shop Now</a>
                    </figcaption>
                </figure>
              </article> `;
        }
    });
    container.innerHTML = articles;

}



function saveCartItemsOnClick(elements) {

    elements.forEach((elem, index) => {
        if (index != 4) {
            elem.children[1].addEventListener('click', (e) => {
                let cart = JSON.parse(localStorage.getItem('cart')) != undefined ? JSON.parse(localStorage.getItem('cart')) : [];
                const imgPath = e.target.parentElement.children[0].children[0].src;
                const image = imgPath.slice(imgPath.search('assets'), imgPath.length);
                const label = e.target.parentElement.children[0].children[1].children[1].textContent;
                const price = e.target.parentElement.children[0].children[1].children[2].textContent.slice(1);
                const id = e.target.parentElement.dataset.id;
                const stock = e.target.parentElement.dataset.stock;
                const counter = e.target.parentElement.dataset.count = parseInt(e.target.parentElement.dataset.count) + 1;
                const totalPrice = parseInt(price) * counter;
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
                    if (x > -1) {
                        cart[x] = product;
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