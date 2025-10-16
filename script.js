// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Set focus to main section for accessibility
            setTimeout(() => { target.setAttribute('tabindex', '-1'); target.focus(); }, 600);
        }
    });
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Animate hamburger icon into X
        hamburger.classList.contains('active') ?
            hamburger.querySelectorAll('span')[0].style.transform = 'rotate(45deg) translateY(5px)' :
            hamburger.querySelectorAll('span')[0].style.transform = '';
        hamburger.classList.contains('active') ?
            hamburger.querySelectorAll('span')[2].style.transform = 'rotate(-45deg) translateY(-5px)' :
            hamburger.querySelectorAll('span')[2].style.transform = '';
        hamburger.classList.contains('active') ?
            hamburger.querySelectorAll('span')[1].style.opacity = '0' :
            hamburger.querySelectorAll('span')[1].style.opacity = '';
    });
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(span => span.style.transform = '');
            hamburger.querySelectorAll('span')[1].style.opacity = '';
        });
    });
}

// Intersection Observer for scroll/reveal animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
sections.forEach(section => { observer.observe(section); });

// Navbar glass background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 14, 39, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.18)';
    } else {
        header.style.background = 'rgba(10, 14, 39, 0.74)';
        header.style.boxShadow = 'none';
    }
});

// Active section highlighting in navbar
const navLinksAll = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Typing animation for terminal
const typingText = document.querySelector('.typing-effect');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    setTimeout(() => {
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 47);
            }
        };
        typeWriter();
    }, 1300);
}

// Fade in page for smooth load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s cubic-bezier(0.49,0.22,0.5,0.99)';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard accessibility for hamburger menu
document.addEventListener('keydown', function(e) {
    if (hamburger && document.activeElement === hamburger && (e.key === "Enter" || e.key === " ")) {
        hamburger.click();
    }
});
