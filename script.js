document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Switcher ---
    const themeSwitch = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeSwitch.checked = true;
        }
    }
    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    }
    if (themeSwitch) {
        themeSwitch.addEventListener('change', switchTheme, false);
    }

    // --- GSAP Home Animation on Load ---
    const homeTextElements = document.querySelectorAll('#home .home-text-animate');
    if(homeTextElements.length > 0) {
        gsap.from(homeTextElements, {
            duration: 0.8, y: 50, opacity: 0, ease: "power2.out", stagger: 0.2, delay: 0.3
        });
    }
    const homeImage = document.querySelector('#home .profile-image');
    if (homeImage) {
        gsap.from(homeImage, {
            duration: 1, opacity: 0, scale: 0.8, delay: 0.5, ease: "power3.out"
        });
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;

    function updateActiveNavLink() {
        let index = sections.length;
        while(--index && window.scrollY + navHeight < sections[index].offsetTop) {}
        navLinks.forEach((link) => link.classList.remove('active'));
        if(sections[index]) {
             let targetLink = document.querySelector(`.nav-link[href="#${sections[index].id}"]`);
             if(targetLink) { targetLink.classList.add('active'); }
        } else if (window.scrollY < 300) {
            let homeLink = document.querySelector('.nav-link[href="#home"]');
             if(homeLink) { homeLink.classList.add('active'); }
        }
    }


    // --- Scroll to Top Button Logic ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollThreshold = 300;
    function handleScroll() {
        if (scrollToTopBtn) {
             if (window.scrollY > scrollThreshold) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
        updateActiveNavLink();
    }
    window.addEventListener('scroll', handleScroll);
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Project Slider Logic ---
    const projectSlider = document.querySelector('.project-slider');
    if (projectSlider) {
        const slidesContainer = projectSlider.querySelector('.project-slides-container');
        const slides = projectSlider.querySelectorAll('.project-slide');
        const prevBtn = projectSlider.querySelector('.prev-btn');
        const nextBtn = projectSlider.querySelector('.next-btn');
        let currentSlide = 0;
        const totalSlides = slides.length;

        function updateSliderUI() {
            if (!slidesContainer) return;
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            if (prevBtn) { prevBtn.disabled = currentSlide === 0; }
            if (nextBtn) { nextBtn.disabled = currentSlide === totalSlides - 1; }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                    updateSliderUI();
                }
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSliderUI();
                }
            });
        }

        if(totalSlides > 0) {
             updateSliderUI();
        } else {
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
        }
    }
    // --- End Project Slider Logic ---


    // === Project Detail Expansion Logic ===
    const allProjectSlides = document.querySelectorAll('.project-slide'); // Renamed variable
    const detailArea = document.getElementById('project-detail-area');
    const detailContents = document.querySelectorAll('.project-detail-content');
    const closeDetailButtons = document.querySelectorAll('.close-detail-btn');

    function hideAllDetails() {
        detailContents.forEach(detail => {
            detail.style.display = 'none';
        });
    }

    allProjectSlides.forEach(slide => { // Use renamed variable
        // Target the card for click, but allow arrows to work independently
        const card = slide.querySelector('.project-post-card');
        const projectIndex = slide.dataset.projectIndex;

        if (card && projectIndex !== undefined) {
            // Add listener to the slide itself, not just the card,
            // so clicks next to the card but within the slide area also work
            slide.addEventListener('click', (e) => {
                 // Prevent clicks on slider buttons or action icons triggering detail view
                 if (e.target.closest('.slider-btn, .post-actions')) {
                     return;
                 }

                const targetDetailId = `project-detail-${projectIndex}`;
                const targetDetailElement = document.getElementById(targetDetailId);

                if (targetDetailElement) {
                    const isAlreadyOpen = targetDetailElement.style.display === 'block';
                    hideAllDetails();
                    if (!isAlreadyOpen) {
                        targetDetailElement.style.display = 'block';
                        // Scroll slightly below the slider to ensure detail is visible
                         targetDetailElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Changed to 'start'
                         // Optional: Add a slight offset scroll if needed after scrollIntoView finishes
                         // setTimeout(() => { window.scrollBy(0, -navHeight); }, 600); // Adjust timing
                    }
                }
            });
        }
    });

    closeDetailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const detailToClose = button.closest('.project-detail-content');
             if(detailToClose) {
                 detailToClose.style.display = 'none';
             }
        });
    });
    // === END: Project Detail Expansion Logic ===


    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

    // --- Contact Form Handling (Placeholder) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted (visually only). Data needs to be sent.');
            alert('Thank you for your message! (This form is currently for demonstration only)');
            // contactForm.reset();
        });
    }

    // Initial call to set active link on page load
    updateActiveNavLink();

}); // End DOMContentLoaded