document.addEventListener('DOMContentLoaded', () => {
            const navbar = document.getElementById('navbar');
            const navLinksContainer = document.querySelector('.nav-links');
            const hamburger = document.getElementById('hamburger-menu');
            const mobileNav = document.getElementById('mobile-nav-menu');
            const allSections = document.querySelectorAll('section');

            // --- NAVIGATION ---
            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });

            // Active nav link highlighting on scroll
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        document.querySelectorAll('.nav-links a').forEach(link => {
                            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                        });
                    }
                });
            }, { rootMargin: '-50% 0px -50% 0px' });
            allSections.forEach(section => sectionObserver.observe(section));

            // --- MOBILE MENU ---
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('open');
                mobileNav.classList.toggle('open');
            });

            // Close menu when a link is clicked
            document.querySelectorAll('.mobile-nav a').forEach(link => {
                link.addEventListener('click', () => {
                    if (mobileNav.classList.contains('open')) {
                        hamburger.classList.remove('open');
                        mobileNav.classList.remove('open');
                    }
                });
            });

            // --- FADE-IN & SKILL BAR ANIMATION ---
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        const progressBars = entry.target.querySelectorAll('.progress-fill');
                        progressBars.forEach(bar => {
                            bar.style.width = bar.getAttribute('data-width');
                        });
                    }
                });
            }, { threshold: 0.1 });

            // Set initial data-width for progress bars
            const progressFills = document.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                fill.setAttribute('data-width', fill.style.width);
                fill.style.width = '0';
            });

            document.querySelectorAll('.fade-in').forEach(el => animationObserver.observe(el));
        });