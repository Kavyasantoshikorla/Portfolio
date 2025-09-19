document.addEventListener('DOMContentLoaded', () => {
            const navbar = document.getElementById('navbar');
            const hamburger = document.getElementById('hamburger-menu');
            const mobileNav = document.getElementById('mobile-nav-menu');
            const allSections = document.querySelectorAll('section');
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
                            document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(l => l.classList.remove('active'));
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, { rootMargin: '-50% 0px -50% 0px' });
            allSections.forEach(section => sectionObserver.observe(section));

            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('open');
                mobileNav.classList.toggle('open');
            });

            document.querySelectorAll('.mobile-nav a').forEach(link => {
                link.addEventListener('click', () => {
                    if (mobileNav.classList.contains('open')) {
                        hamburger.classList.remove('open');
                        mobileNav.classList.remove('open');
                    }
                });
            });
            const animationObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        const progressBars = entry.target.querySelectorAll('.progress-fill');
                        progressBars.forEach(bar => {
                            bar.style.width = bar.getAttribute('data-width');
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            const progressFills = document.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                fill.setAttribute('data-width', fill.style.width);
                fill.style.width = '0';
            });

            document.querySelectorAll('.fade-in').forEach(el => animationObserver.observe(el));
        });