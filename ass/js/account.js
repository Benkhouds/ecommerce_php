const logout = document.querySelector('.logout');

document.addEventListener('DOMContentLoaded', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', "php/getUser.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText);
            if (isJson(this.response)) {
                const result = JSON.parse(this.response);
                const image = document.querySelector('.account-details img');
                const username = document.querySelector('.user-info h4');
                const email = document.querySelector('.user-info p');
                image.src = `user_images/${result.image}`;
                username.textContent = `${result.fname}  ${result.lname}`;
                email.textContent = `${result.email}`;
            }
        }
    }

    xhr.send();
});

logout.addEventListener('click', (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "php/logout.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            console.log(this.responseText);
            if (this.response == "logged out") {
                location.href = "login.html";
            }
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("logout=" + "true");
})


function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


/* function getOrders() {
    console.log("get order");
} */