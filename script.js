document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       Navbar Scroll Effect
       ========================================================================= */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    /* =========================================================================
       Mobile Navigation Toggle
       ========================================================================= */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link, .nav-links .btn');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('ph-list', 'ph-x');
        } else {
            icon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const closeIcon = mobileBtn.querySelector('i');
            if (closeIcon.classList.contains('ph-x')) {
                closeIcon.classList.replace('ph-x', 'ph-list');
            }
        });
    });

    /* =========================================================================
       Scroll Animations (Intersection Observer)
       ========================================================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once faded in to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements to be animated
    const hiddenElements = document.querySelectorAll('.hidden');

    // Add staggered delay to children of grids/timelines
    const grids = document.querySelectorAll('.grid, .timeline, .posts-grid');
    grids.forEach(grid => {
        const children = grid.querySelectorAll('.hidden');
        children.forEach((child, index) => {
            // Add a class based on index, capping at delay-3
            const delayClass = `delay-${Math.min(index + 1, 3)}`;
            child.classList.add(delayClass);
        });
    });

    hiddenElements.forEach(el => observer.observe(el));

    /* =========================================================================
       Active Nav Link Highlighting on Scroll
       ========================================================================= */
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Account for sticky nav
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    // Trigger once on load
    updateActiveNavLink();

    /* =========================================================================
       Functional Mock "Like" Buttons
       ========================================================================= */
    const likeBtns = document.querySelectorAll('.like-btn');

    likeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.classList.toggle('liked');
            const icon = this.querySelector('i');

            // Toggle icon fill
            if (this.classList.contains('liked')) {
                icon.classList.remove('ph');
                icon.classList.add('ph-fill');
            } else {
                icon.classList.remove('ph-fill');
                icon.classList.add('ph');
            }
        });
    });
});
