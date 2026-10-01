const btnArriba = document.querySelector(".btn-arriba");

window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
        btnArriba.classList.add("btn-arriba--visible");
    } else {
        btnArriba.classList.remove("btn-arriba--visible");
    }
});