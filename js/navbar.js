const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("navbar--visible");
    } else {
        navbar.classList.remove("navbar--visible");
    }
});