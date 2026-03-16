// =============================================
//  LHNS Engineering Trading — script.js
// =============================================

// ===== NAVBAR: STICKY + SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#' + section.id) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Run on load

// ===== SCROLL-IN ANIMATIONS (Intersection Observer) =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger delay for grid items
            const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
            let delay = 0;
            siblings.forEach((sibling, i) => {
                if (sibling === entry.target) delay = i * 80;
            });

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);

            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== PROJECT GALLERY FILTER =====
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                // Re-trigger fade animation
                card.classList.remove('visible');
                setTimeout(() => card.classList.add('visible'), 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
