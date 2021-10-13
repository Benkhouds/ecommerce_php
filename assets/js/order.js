const checkoutBtn = document.querySelector('.checkout');

checkoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("logged")) {
        location.href = "login.html";
    } else {
        checkout();
    }
});

function checkout() {

    const total = parseInt(document.querySelector('.cartTotal strong').textContent.slice(1));
    if (total==0) {
        location.href = "shop.html";
    } else {
        checkoutPost(total);
    }
}

function checkoutPost(total) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/order.php', true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.response);
            const result = this.response.slice(this.response.indexOf(this.response.length) - 6).trim();
            console.log(result);
            if (result == "success") {
                let successMessage = document.getElementById('success');
                successMessage.style.display = "block";

                setTimeout(() => {
                    successMessage.style.display = "none";
                    location.href = "shop.html";
                }, 1500);
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('order=' + localStorage.getItem('cart') + '&orderTotal=' + total);
}