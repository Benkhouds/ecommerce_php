const form = document.querySelector('#register form'),
    submitBtn = document.querySelector("#register button.primary-btn");

/*const errorText = form.querySelector(".error-text");*/

form.onsubmit = (e) => {
    e.preventDefault();
}

submitBtn.onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/register.php", true);
    xhr.onload = function () {
        if (this.status == 200) {
            let data = this.responseText;
            if (data == "success") {
                location.href = "shop.html";

            } else {
                /*error !! */
                console.log(data);
            }
        }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}