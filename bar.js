document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const primaryNav = document.getElementById("primary-nav");
    const navLinks = primaryNav ? primaryNav.querySelectorAll("a") : [];
    const reservationForm = document.getElementById("reservation-form");
    const statusField = reservationForm ? reservationForm.querySelector(".form-status") : null;

    const closeNav = () => {
        if (!navToggle || !primaryNav) {
            return;
        }
        navToggle.setAttribute("aria-expanded", "false");
        primaryNav.classList.remove("primary-nav--open");
    };

    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", () => {
            const expanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!expanded));
            primaryNav.classList.toggle("primary-nav--open");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (window.matchMedia("(max-width: 900px)").matches) {
                    closeNav();
                }
            });
        });

        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && primaryNav.classList.contains("primary-nav--open")) {
                closeNav();
            }
        });
    }

    if (reservationForm && statusField) {
        reservationForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!reservationForm.checkValidity()) {
                statusField.textContent = "Revisa los campos requeridos antes de enviar.";
                statusField.style.color = "#f75335";
                return;
            }

            const formData = new FormData(reservationForm);
            const name = formData.get("name") || "";
            const guests = formData.get("guests") || "";
            const date = formData.get("date") || "";

            statusField.textContent = `Reserva recibida para ${name} · ${guests} personas · ${date}`;
            statusField.style.color = "#66ff87";

            reservationForm.reset();

            setTimeout(() => {
                statusField.textContent = "";
            }, 6000);
        });
    }
});
