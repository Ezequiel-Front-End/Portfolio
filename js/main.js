AOS.init({ offset: 300, duration: 1400 });

const header = document.querySelector("header");

window.addEventListener("scroll", () => { header.classList.toggle("sticky", window.scrollY > 10); });

const menu = document.getElementById("menu-icon");
const navlist = document.querySelector(".navlist");

menu.onclick = () => { menu.classList.toggle('bx-x'); navlist.classList.toggle('active'); };

window.onscroll = () => { menu.classList.remove('bx-x'); navlist.classList.remove('active'); };

const btnToogle = document.querySelector(".ui-switch");
const html = document.querySelector("html");

btnToogle.addEventListener("change", () => {
    html.classList.toggle("dark-mode");
});
