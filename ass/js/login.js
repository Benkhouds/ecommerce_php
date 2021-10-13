const form = document.querySelector(".login-form form"),
    signInBtn = form.querySelector(".sign-in button"),
    errorText = document.querySelector(".error-text");


form.onsubmit = (e) => {
    e.preventDefault();
}


signInBtn.onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/login.php", true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = this.responseText;
            console.log(data);
            if (data == "success") {
                if (localStorage.getItem('cart') != null) {
                    checkWithClient();
                } else {
                    getCart();
                }
            }
        }

    }
    let formData = new FormData(form);
    xhr.send(formData);
}

function checkWithClient() {
    const modal = document.querySelector('#login .modal'),
        veil = document.querySelector('#login .veil'),
        modalButtons = document.querySelector('.modal div');
    modal.style.display = 'flex';
    veil.style.display = 'block';
    setTimeout(() => {
        veil.style.opacity = 1;
    }, 50);
    modalButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('yes-btn')) {
            modal.style.display = 'none';
            veil.style.display = 'none';
            insertCart();
            location.href = "shop.html";
        } else if (e.target.classList.contains('no-btn')) {
            modal.style.display = 'none';
            veil.style.display = 'none';
            getCart();
        }
    })
}

function getCart() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/getCartItems.php', true);
    xhr.onload = function () {
        if (this.status == 200) {

            if (isJson(this.response)) {
                localStorage.setItem('cart', this.response);
                location.href = "shop.html";
            } else {
                console.log('no data is received');
            }
        }
    }
    xhr.send();
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function insertCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    const items = [];
    cart.forEach((elem) => {
        const item = {
            id: elem.id,
            quantity: elem.counter
        }
        items.push(item);
    })
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/insertCart.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            if (this.response == "success") {
                location.href = "shop.html";
            } else {
                console.log(this.response);
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("items=" + JSON.stringify(items));
}