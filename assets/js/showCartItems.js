const subTotal = document.querySelector('.cartTotal');
const tbody = document.querySelector('.cart-table tbody');

window.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) != undefined ? JSON.parse(localStorage.getItem('cart')) : [];
    tbody.innerHTML = "";
    if (cart.length > 0) {
        let total = 0;
        cart.forEach((elem) => {

            const tableRow = `<tr  data-id="${elem.id}" data-total="${elem.totalPrice}" class="table-row" >
            <td>
               <a href="product.html?product_id=${elem.id}">
                    <img src="assets/images/${elem.image}" alt="">
                    <p class="label">${elem.label}</p>
               </a>
            </td>
            <td>
               <strong>$${elem.price}</strong>
            </td>
            <td>
                <input type="number" name="quantity" oninput="updateTotalUI(${elem.id},${elem.price},this)" value="${elem.counter}" min="1">
            </td>
            <td>
                <strong class="total">$${elem.totalPrice}</strong>
                <a href="" class="fancy-link" data-id="${elem.id}" data-counter="${elem.counter}">Remove</a>
            </td>
           </tr>`;
            tbody.innerHTML += tableRow;
            total += elem.totalPrice;

        });
        subTotal.innerHTML = `&nbsp;&nbsp;<strong>$${total}</strong>`;
        Array.from(tbody.children).forEach((tr) => {
            tr.lastElementChild.children[1].addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.target.dataset.id;
                removeItem(id, e.target.parentElement.parentElement);
            })
        })


    } else {
        const message = "<div style='padding:2rem 0;'>Your cart is empty</div>";
        tbody.innerHTML = message;
    }
})

function updateTotalUI(id, price, input) {

    if (input.value != "") {
        const rows = document.querySelectorAll('.cart-table tbody tr');
        const priceTag = input.parentElement.nextElementSibling.children[0];
        const newPrice = parseInt(input.value) * parseInt(price);
        priceTag.innerHTML = `$${newPrice}`;
        input.parentElement.parentElement.dataset.total = newPrice;
        let totalPrice = 0;
        rows.forEach((element) => {
            if (element.dataset.id == id) {
                totalPrice += newPrice;
            } else {
                totalPrice += parseInt(element.dataset.total);
            }
        });
        subTotal.innerHTML = `&nbsp;&nbsp;<strong>$${totalPrice}</strong>`;

    } else {
        console.log('put a number');
    }
}

function removeItem(id, item) {
    const cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    for (const [index, elem] of cart.entries()) {
        if (elem.id == id) {
            const newTotal =parseInt(subTotal.textContent.trim().slice(1)) - elem.totalPrice;
            subTotal.innerHTML = `$${newTotal}`;
            cart.splice(index, 1);
            break;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    item.remove();
    deleteItemFromDatabase(id);

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