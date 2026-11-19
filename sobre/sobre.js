document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const headerNav = document.querySelector("header nav");

    if (menuToggle && navLinks && headerNav) {
        menuToggle.addEventListener("click", () => {
            const estaAberto = navLinks.classList.toggle("aberto");
            headerNav.classList.toggle("menu-aberto");
            menuToggle.setAttribute("aria-expanded", estaAberto);
        });
    }

    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elements.forEach((element) => observer.observe(element));
});
