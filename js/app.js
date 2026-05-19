document.getElementById("year").textContent = new Date().getFullYear();

/* ===== PARTICLES ===== */
(function createParticles() {
    const container = document.getElementById("particles");
    for (let i = 0; i < 20; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        const size = Math.random() * 6 + 2;
        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDuration = (Math.random() * 12 + 10) + "s";
        p.style.animationDelay = (Math.random() * 15) + "s";
        container.appendChild(p);
    }
})();

/* ===== TYPING EFFECT ===== */
(function typeWriter() {
    const text = "Hello World";
    const el = document.getElementById("typing-text");
    const cursor = document.getElementById("typing-cursor");
    let i = 0;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 80);
        } else {
            cursor.style.animation = "none";
            cursor.style.opacity = "1";
        }
    }

    setTimeout(type, 400);
})();

/* ===== MOBILE NAV TOGGLE ===== */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
            toggle.classList.toggle("nav_toggle--active");
        });
    }
};

showMenu("nav-toggle", "nav-menu");

/* ===== ACTIVE LINK ===== */
const navLinks = document.querySelectorAll(".nav_link");

function linkAction() {
    navLinks.forEach((n) => n.classList.remove("active"));
    this.classList.add("active");

    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show");

    const navToggle = document.getElementById("nav-toggle");
    navToggle.classList.remove("nav_toggle--active");
}

navLinks.forEach((n) => n.addEventListener("click", linkAction));

/* ===== DARK MODE TOGGLE ===== */
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

themeToggle.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
});

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

/* ===== TERMINAL CODE TYPING ===== */
(function terminalTyping() {
    const codeEl = document.getElementById("terminal-code");
    const outputEl = document.getElementById("terminal-output");
    const code = `#include <stdio.h>
int main()
{
    printf("hello world!\\n");
    return 0;
}`;
    const speed = 28;

    function run() {
        codeEl.textContent = "";
        outputEl.innerHTML = "";
        let i = 0;

        function type() {
            if (i < code.length) {
                codeEl.textContent += code.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    const lines = [
                        { text: "$ gcc hello.c -o hello", delay: 400 },
                        { text: "$ ./hello", delay: 500 },
                        { text: "hello world!", delay: 400 },
                    ];
                    let d = 0;
                    lines.forEach((l) => {
                        d += l.delay;
                        setTimeout(() => {
                            const p = document.createElement("p");
                            p.textContent = l.text;
                            outputEl.appendChild(p);
                            outputEl.scrollTop = outputEl.scrollHeight;
                        }, d);
                    });
                    setTimeout(run, d + 2500);
                }, 500);
            }
        }

        type();
    }

    setTimeout(run, 800);
})();

/* ===== RIPPLE EFFECT ===== */
document.querySelectorAll(".button").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = size + "px";
        ripple.style.height = size + "px";
        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";
        this.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
    });
});

/* ===== LIGHTBOX ===== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const galleryItems = document.querySelectorAll(".gallery_img");
let currentIndex = 0;

function getCaption(item) {
    const title = item.querySelector("p:first-of-type").textContent;
    const date = item.querySelector("p:last-of-type").textContent;
    return `<strong>${title}</strong><br><span>${date}</span>`;
}

function openLightbox(index) {
    const item = galleryItems[index];
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.innerHTML = getCaption(item);
    currentIndex = index;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.innerHTML = getCaption(item);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const item = galleryItems[currentIndex];
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.innerHTML = getCaption(item);
}

galleryItems.forEach((item, i) => {
    item.addEventListener("click", () => openLightbox(i));
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    prevImage();
});

lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    nextImage();
});

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
        closeLightbox();
    } else if (e.key === "ArrowLeft") {
        prevImage();
    } else if (e.key === "ArrowRight") {
        nextImage();
    }
});

/* ===== DIGITAL SIGNATURE (IP FETCH) ===== */
const ipEl = document.querySelector(".ip");
const ispEl = document.querySelector(".isp");
const cityEl = document.querySelector(".city");
const countryEl = document.querySelector(".country");

window.addEventListener("load", async () => {
    try {
        let data = await fetch("https://luman.mooo.com/whoami");
        if (data.ok) {
            data = await data.json();
            ipEl.innerHTML = data.ip;
            ispEl.innerHTML = data.isp;
            cityEl.innerHTML = data.city;
            countryEl.innerHTML = data.country;
        }
    } catch {
        ipEl.innerHTML = ispEl.innerHTML = cityEl.innerHTML = countryEl.innerHTML = "Failed to detect";
    }
});

/* ===== MESSENGER FORM ===== */
const form = document.querySelector(".messenger_form");
const submitBtn = form.querySelector(".messenger_button");
const toast = document.getElementById("toast");

function showToast(msg, type) {
    toast.textContent = msg;
    toast.className = "toast " + type + " show";
    setTimeout(() => toast.classList.remove("show"), 3000);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const msg = form.querySelector('[name="msg"]').value.trim();

    if (!name || !email || !msg) {
        showToast("Please fill all fields", "error");
        return;
    }
    if (!email.includes("@") || !email.includes(".")) {
        showToast("Invalid email address", "error");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.value = "Sending...";

    try {
        const res = await fetch(form.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ name, email, msg }),
        });
        if (res.ok) {
            showToast("Message sent successfully!", "success");
            form.reset();
        } else {
            showToast("Failed to send message", "error");
        }
    } catch {
        showToast("Network error. Try again.", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.value = "Send Message";
    }
});
