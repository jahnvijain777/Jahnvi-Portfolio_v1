/**
 * Jahnvi Jain - Personal Portfolio
 * Interactive Features: Typewriter, Scroll-Spy, Mobile Nav, Copy Email, Form Handling
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Typewriter Effect ---
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement) {
        const roles = [
            "B.Tech CSE Student",
            "AI & Data Science Undergrad",
            "Python & C++ Learner",
            "Web Development Student"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingDelay = 100;
        const deletingDelay = 60;
        const pauseDelay = 1800;

        function type() {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(type, pauseDelay);
                    return;
                }
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(type, 400);
                    return;
                }
            }

            setTimeout(type, isDeleting ? deletingDelay : typingDelay);
        }

        type();
    }

    // --- 2. Sticky Header with Shadow on Scroll ---
    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // --- 3. Mobile Navigation Menu Toggle ---
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("open");
            const icon = mobileToggle.querySelector("i");
            const span = mobileToggle.querySelector("span");
            if (icon) {
                if (navMenu.classList.contains("open")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                    if (span) span.textContent = "Close";
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                    if (span) span.textContent = "Menu";
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains("open")) {
                navMenu.classList.remove("open");
                const icon = mobileToggle.querySelector("i");
                const span = mobileToggle.querySelector("span");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
                if (span) span.textContent = "Menu";
            }
        });

        // Close menu when clicking any nav link
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                const icon = mobileToggle.querySelector("i");
                const span = mobileToggle.querySelector("span");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
                if (span) span.textContent = "Menu";
            });
        });
    }

    // --- 4. Scroll-Spy (Auto-highlight active nav link) ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav.nav-menu a[href^='#']");

    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -65% 0px",
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute("id");
                    navLinks.forEach(link => {
                        if (link.getAttribute("href") === `#${activeId}`) {
                            link.classList.add("active");
                        } else {
                            link.classList.remove("active");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));
    }

    // --- 5. Copy Email to Clipboard ---
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", async () => {
            const email = "jahnvijain456@gmail.com";
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const tempInput = document.createElement("input");
                    tempInput.value = email;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand("copy");
                    document.body.removeChild(tempInput);
                }

                const originalHTML = copyEmailBtn.innerHTML;
                copyEmailBtn.classList.add("copied");
                copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';

                setTimeout(() => {
                    copyEmailBtn.classList.remove("copied");
                    copyEmailBtn.innerHTML = originalHTML;
                }, 2200);
            } catch (err) {
                console.error("Failed to copy email:", err);
            }
        });
    }
});
