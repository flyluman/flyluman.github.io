const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
        });
    }
};

showMenu("nav-toggle", "nav-menu");

const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
    navLink.forEach((n) => n.classList.remove("active"));
    this.classList.add("active");
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));


let ip = document.querySelector(".ip");
let isp = document.querySelector(".isp");
let city = document.querySelector(".city");
let country = document.querySelector(".country");

window.addEventListener("load", async () => {
    try {
        let data = await fetch("https://34.148.75.49/whoami");
        if (data.ok) {
            data = await data.json();
            ip.innerHTML = data.ip;
            isp.innerHTML = data.isp;
            city.innerHTML = data.city;
            country.innerHTML = data.country;
        }
    } catch {
        ip.innerHTML = isp.innerHTML = city.innerHTML = country.innerHTML = 'Failed to detect';
    }
});
