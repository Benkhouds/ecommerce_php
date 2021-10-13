const dropdownToggle = document.querySelectorAll('.dropdown>a');
console.log(dropdownToggle);

dropdownToggle.forEach((elem) => {
    elem.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.parentElement.classList.contains('active')) {
            e.target.parentElement.classList.remove('active');

        } else {

            setTimeout(function () {

                e.target.parentElement.classList.add('active');

            }, 100);

        }
    });

});



const file = document.querySelector('#image input[type="file"]');

file.addEventListener('change', (e) => {
    const image = document.getElementById('output');
    image.src = URL.createObjectURL(e.target.files[0]);

});
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#users').style.display = "block";
    getUsers();
})

const links = document.querySelectorAll('.section__link');
const sectionArray = ["users", "products", "addProduct", "categories", "addCategory", "orders"];

const sections = document.querySelectorAll('section');
console.log(sections);
links.forEach((elem) => {

    elem.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target);
        sections.forEach((section) => {
            section.style.display = "none";
        })
        document.querySelector(`#${sectionArray[parseInt(e.target.dataset.id)]}`).style.display = "block";
        switch (parseInt(e.target.dataset.id)) {
            case 0:
                getUsers();
                break;
            case 1:
                console.log("PP");
                getProducts();
                break;
            case 2:
                renderSelectCategories();
                postProduct();
                break;
            case 3:
                console.log("in")
                getCategories().then((res) => {
                    console.log(res);
                    renderCategories(res);
                });
                break;
            case 4:
                addCategory();
                break;
            case 5:
                getOrders();
                break;



        }


    });
})

function getOrders() {
    const container = document.querySelector('.orders-table tbody');
    const xhr = new XMLHttpRequest();
    console.log("in");
    xhr.open('GET', 'php/getOrders.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            if (isJson(this.response)) {
                const data = JSON.parse(this.response);
                console.log(data);
                renderOrders(data, container);

            } else {
                console.log(this.response);
            }
        } else {
            console.log('server problem')
        }
    }
    xhr.send();
}

function renderOrders(data, container) {
    let orders = "";
    data.forEach((order) => {
        orders +=
            ` <tr class="table-row">
                <td>
                    <span>${order[0]}  /  ${order[1]}</span>
                </td>
                <td>
                    <span>$${order[2]}.00</span>
                </td>
                <td>
                    <span class="nb">${order[3]}</span>
                </td>
                <td>
                    <button class="primary-btn" data-id="${order[0]}" style="background:rgb(145, 33, 33);">Delete Order</button>
                </td>

            </tr>
               `;
    })
    container.innerHTML = orders;
    Array.from(container.children).forEach((child) => {
        child.children[3].children[0].addEventListener('click', (e) => {
            e.preventDefault();
            deleteUser(e.target.dataset.id, child);
        })
    })
}

function deleteOrder(id, item) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/deleteOrder.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            if (this.response == "success") {
                item.remove();
                console.log("deleted");
            } else {
                console.log(this.response);
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("order=" + id);
}

function getUsers() {
    const container = document.querySelector('.users-table tbody');
    const xhr = new XMLHttpRequest();
    console.log("in");
    xhr.open('GET', 'php/getUsers.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            if (isJson(this.response)) {
                const data = JSON.parse(this.response);
                console.log(data);
                renderUsers(data, container);

            } else {
                console.log(this.response);
            }
        } else {
            console.log('server problem')
        }
    }
    xhr.send();
}

function deleteUser(id, item) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/deleteUser.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            if (this.response == "success") {
                item.remove();
                console.log("deleted");
            } else {
                console.log(this.response);
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("user_id=" + id);
}

function renderUsers(data, container) {
    let users = "";
    data.forEach((user) => {
        users +=
            ` <tr class="table-row">
                <td>
                    <img src="../user_images/${user[5]}" alt="">
                </td>
                <td>

                    <p class="label">${user[1]} ${user[2]}</p>
                </td>
                <td>
                    <p class="label email">${user[3]}</p>
                </td>
                <td>
                    <p>${user[7]}</p>
                    <a href="javascript:void(0);" class="fancy-link" data-id="${user[0]}">Remove</a>
                </td>
            </tr>
           `;
    })
    container.innerHTML = users;
    Array.from(container.children).forEach((child) => {
        child.children[3].children[1].addEventListener('click', (e) => {
            e.preventDefault();
            deleteUser(e.target.dataset.id, child);
        })
    })
}

function addCategory() {
    const postBtn = document.querySelector('#addCategory .primary-btn');
    const form = document.querySelector('#addCategory form');
    postBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target);
        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/addCat.php', true);
        xhr.onload = function () {
            if (this.status == 200) {
                if (this.response == "success") {
                    document.getElementById('addCategory').style.display = "none";
                    document.getElementById('categories').style.display = "block";
                    getCategories().then((res) => renderCategories(res)).catch(err => console.log(err));
                }
            }
        }
        xhr.send(formData);

    })
}

function getCategories() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'php/getCategories.php', true);
        xhr.onload = function () {
            if (this.status == 200) {
                if (isJson(this.response)) {
                    const data = JSON.parse(this.response);
                    resolve(data);

                } else {
                    console.log(this.response);
                }
            } else {
                console.log('server problem');
            }
        }
        xhr.onerror = reject;
        xhr.send();
    });
}

function renderCategories(categories) {
    const categoriesTable = document.querySelector('.categories-table tbody');
    let articles = "";
    categories.forEach((category) => {
        articles += `
                <tr class="table-row">
                <td>

                    <p>${category[0]}</p>
                </td>
                
                <td>
                    <input type="text" class="cat__input" value="${category[1]}">
                </td>
                <td>
                    <input type="text" class="cat__input--sub" value="${category[2]}">
                </td>
               
                <td>

                    <a href="" data-id="${category[0]}" class="fancy-link">Update</a>
                    <a href="" data-id="${category[0]}" class="fancy-link">Remove</a>
                </td>
            </tr>
           `
    })
    categoriesTable.innerHTML = articles;
    Array.from(categoriesTable.children).forEach((child) => {
        child.children[3].children[0].addEventListener('click', (e) => {
            e.preventDefault();
            const firstValue = child.children[1].children[0].value;
            const secondValue = child.children[2].children[0].value;
            updateCat(e.target.dataset.id, firstValue, secondValue);
        })
        child.children[3].children[1].addEventListener('click', (e) => {
            e.preventDefault();
            deleteCat(e.target.dataset.id, child);
        })
    })
}

function updateCat(id, a, b) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/updateCat.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            if (this.response == "success") {
                getCategories().then((res) => renderCategories(res)).catch(err => console.log(err));
                console.log("updated");
            } else {
                console.log(this.response);
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const cat = {
        id,
        label: a,
        sub: b
    }
    xhr.send("cat=" + JSON.stringify(cat));
}

function deleteCat(id, item) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/deleteCat.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            if (this.response == "success") {
                item.remove();
                console.log("deleted");
            } else {
                console.log(this.response);
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("cat_id=" + id);
}

function renderSelectCategories() {
    const select = document.querySelector("#category");
    let options = "";
    console.log(select);
    getCategories().then((res) => {
        console.log(res);
        res.forEach((cat) => {
            options += `
                <option value="${cat[0]}">${cat[2]}</option>
              `;
        });
        select.innerHTML = options;
    }).catch(err => console.log(err));

}

function postProduct() {
    const postBtn = document.querySelector('#addProduct .primary-btn.add');
    const form = document.querySelector('#addProduct form');
    postBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target);
        const formData = new FormData(form);
        let object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        })
        console.log(object);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/addProduct.php', true);
        xhr.onload = function () {
            if (this.status == 200) {
                if (this.response == "success") {
                    document.getElementById('addProduct').style.display = "none";
                    document.getElementById('products').style.display = "block";
                    getProducts();
                }
            }
        }
        xhr.send(formData);

    })
}





function getProducts() {
    const container = document.querySelector('#products .products-container');
    const xhr = new XMLHttpRequest();
    console.log("in");
    xhr.open('GET', 'php/getProducts.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            if (isJson(this.response)) {
                const data = JSON.parse(this.response);
                console.log(data);
                renderProducts(data, container);
                setTimeout(() => {
                    deleteProductOnClick(Array.from(container.children));
                }, 200);
            } else {
                console.log(this.response);
            }
        } else {
            console.log('server problem')
        }
    }
    xhr.send();
}

function renderProducts(data, container) {
    let articles = "";
    data.forEach((product) => {
        articles +=
            `<article class="product">
    <figure>
        <img src="../assets/images/${product[4]}" alt="product">
        <figcaption>
            <span class="label">${product[1]}</span>
            <h3>${product[2]}</h3>
            <span class="label">$${product[7]}.00</span>
        </figcaption>
    </figure>
    <button class="primary-btn" data-id="${product[0]}">Delete</button>
    <a href=""></a> 
    </article>`;
    })


    container.innerHTML = articles;
}

function deleteProductOnClick(elements) {
    elements.forEach((elem) => {
        elem.children[1].addEventListener('click', (e) => {
            e.target.parentElement.remove();
            deleteProductFromDatabase(parseInt(e.target.dataset.id));
        })
    })
}

function deleteProductFromDatabase(id) {
    console.log(id);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/deleteProduct.php', true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            if (xhr.response == "success") {
                console.log("deleted");
            } else {
                console.log(xhr.response);
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("product_id=" + id);
}

function isJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}