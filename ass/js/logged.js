document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("logged") === null) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'php/isLogged.php', true);
        xhr.onload = function () {
            if (this.status == 200) {
                if (this.response == "logged") {
                    sessionStorage.setItem('logged', JSON.stringify({
                        logged: true
                    }));
                    console.log("logged");
                } else {
                    sessionStorage.removeItem('logged');
                    console.log('not logged');
                }
            }
        }
        xhr.send();
    } else {
        console.log('not logged');
    }
});