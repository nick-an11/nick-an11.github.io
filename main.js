(() => {
    const yearEl = document.querySelector('[data-current-year]');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const projectsCta = document.querySelector('[data-cta="projects"]');
    const projectsSection = document.querySelector('#projects');
    if (projectsCta) {
        const triggerAnimation = (event) => {
            if (projectsSection) {
                event.preventDefault();
                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            projectsCta.classList.remove('is-animating');
            // Force reflow so animation can restart if button is clicked quickly
            void projectsCta.offsetWidth;
            projectsCta.classList.add('is-animating');
        };

        projectsCta.addEventListener('click', triggerAnimation);
        projectsCta.addEventListener('animationend', () => {
            projectsCta.classList.remove('is-animating');
        });
    }
})();

