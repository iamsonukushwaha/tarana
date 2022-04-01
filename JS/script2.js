function cb(response) {
    document.querySelector('#visits').innerHTML = `${response.value} Views`;
}

function aboutUs() {
    window.open("./aboutus.html", "_blank");
}