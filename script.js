const themeToggle = document.getElementById('checkbox');
const projectCards = document.querySelectorAll('.project-card');
const filterButtons = document.querySelectorAll('.filter-btn');
const skillBars = document.querySelectorAll('.progress');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const parallaxBg = document.querySelector('.parallax-bg');

// Theme Toggle Functionality
themeToggle.addEventListener('change', function () {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.checked = true;
    }
}

// Project Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Scroll Animation
function checkScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('animate-fadeIn');

            if (section.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}

// Animate Skill Bars
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Parallax Effect for background
function updateParallax() {
    if (parallaxBg) {
        const scrollPosition = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you for your message, ${formData.get('name')}! I'll get back to you soon.</p>
        `;

        this.style.opacity = '0';
        setTimeout(() => {
            this.parentNode.replaceChild(successMessage, this);
            successMessage.style.opacity = '1';
        }, 300);
    });
}

// Initial check on page load
window.addEventListener('load', () => {
    checkScroll();
    document.querySelectorAll('.project-card, .skill-category').forEach(item => {
        item.classList.add('animate-fadeIn');
    });
});

// Scroll event listener
window.addEventListener('scroll', () => {
    checkScroll();
    updateParallax();
});

// Add CSS for animations via JS
const style = document.createElement('style');
style.textContent = `
    .success-message {
        background-color: var(--color-accent);
        color: white;
        padding: 30px;
        border-radius: var(--border-radius);
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .success-message i {
        font-size: 3rem;
        margin-bottom: 15px;
    }

    section {
        opacity: 0;
        transition: opacity 0.6s ease;
    }

    section.animate-fadeIn {
        opacity: 1;
    }

    .project-card, .skill-category {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease, background-color var(--transition-speed);
    }

    .project-card.animate-fadeIn, .skill-category.animate-fadeIn {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
