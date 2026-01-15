// GSAP Animation for Navigation Menu
gsap.registerPlugin(ScrollTrigger);

// Header hide/show on scroll
let lastScrollTop = 0;
let isHeaderVisible = true;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling DOWN - hide header (only if scrolled more than 100px)
        if (isHeaderVisible) {
            gsap.to(header, { duration: 0.4, y: -100, opacity: 0, pointerEvents: 'none', ease: 'power2.in' });
            isHeaderVisible = false;
        }
    } else {
        // Scrolling UP - show header
        if (!isHeaderVisible) {
            gsap.to(header, { duration: 0.4, y: 0, opacity: 1, pointerEvents: 'auto', ease: 'power2.out' });
            isHeaderVisible = true;
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

window.addEventListener('DOMContentLoaded', () => {
    // Animate header on page load
    gsap.fromTo('header', 
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    // Animate nav links with stagger
    gsap.fromTo('nav a',
        { opacity: 0, scale: 0.8, rotationZ: -5 },
        { 
            opacity: 1, 
            scale: 1, 
            rotationZ: 0,
            duration: 0.6, 
            stagger: 0.1,
            ease: 'back.out',
            delay: 0.3
        }
    );

    // Add hover animations to nav links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            gsap.to(this, { 
                duration: 0.3, 
                scale: 1.1, 
                boxShadow: '0 12px 30px rgba(255, 255, 255, 0.5)',
                ease: 'power2.out'
            });
        });

        link.addEventListener('mouseleave', function() {
            gsap.to(this, { 
                duration: 0.3, 
                scale: 1, 
                boxShadow: '0 8px 20px rgba(255, 255, 255, 0.3)',
                ease: 'power2.out'
            });
        });
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Animate list items with stagger
    const listItems = document.querySelectorAll('section ul li');
    listItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, x: -30 },
            { 
                opacity: 1, 
                x: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
});
