// GSAP Animation for Navigation Menu
gsap.registerPlugin(ScrollTrigger);

// Header collapse/expand toggle
let isHeaderExpanded = true;

window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#mainHeader');
    const headerToggle = document.querySelector('#headerToggle');
    const headerNav = document.querySelector('#headerNav');
    
    // Find the info section (p tag with contact info)
    const headerInfo = header?.querySelector('p');
    
    if (headerToggle && headerNav && headerInfo) {
        headerToggle.addEventListener('click', () => {
            isHeaderExpanded = !isHeaderExpanded;
            
            if (!isHeaderExpanded) {
                // Collapse - hide nav and info
                gsap.to([headerNav, headerInfo], {
                    duration: 0.4,
                    opacity: 0,
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginBottom: 0,
                    ease: 'power2.in',
                    onComplete: () => {
                        headerNav.style.display = 'none';
                        headerInfo.style.display = 'none';
                    }
                });
                gsap.to(headerToggle, { duration: 0.3, rotation: 180, ease: 'power2.inOut' });
            } else {
                // Expand - show nav and info
                headerNav.style.display = 'flex';
                headerInfo.style.display = 'block';
                gsap.to([headerNav, headerInfo], {
                    duration: 0.4,
                    opacity: 1,
                    height: 'auto',
                    paddingTop: 'auto',
                    paddingBottom: 'auto',
                    marginBottom: 'auto',
                    ease: 'power2.out'
                });
                gsap.to(headerToggle, { duration: 0.3, rotation: 0, ease: 'power2.inOut' });
            }
        });
    }

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
        // Store original background color
        const isActive = link.classList.contains('bg-cyan-500/20');
        
        link.addEventListener('mouseenter', function() {
            if (!isActive) {
                this.classList.add('bg-slate-700', 'text-cyan-300');
            }
            gsap.to(this, { 
                duration: 0.3, 
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        link.addEventListener('mouseleave', function() {
            if (!isActive) {
                this.classList.remove('bg-slate-700', 'text-cyan-300');
            }
            gsap.to(this, { 
                duration: 0.3, 
                scale: 1,
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
