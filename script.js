document.addEventListener('DOMContentLoaded', () => {
    
    // --- EFFECT 1: Dynamic Typewriter Loop ---
    const typewriterElem = document.querySelector('.typewriter');
    const words = JSON.parse(typewriterElem.getAttribute('data-words'));
    let wordIndex = 0;
    let txt = '';
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            txt = currentWord.substring(0, txt.length - 1);
        } else {
            txt = currentWord.substring(0, txt.length + 1);
        }

        typewriterElem.innerHTML = txt;
        let typeSpeed = 100;

        if (isDeleting) { typeSpeed /= 2; }

        if (!isDeleting && txt === currentWord) {
            typeSpeed = 1800; // Freeze text completely read state
            isDeleting = true;
        } else if (isDeleting && txt === '') {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; 
        }

        setTimeout(() => type(), typeSpeed);
    }
    type();

    // --- EFFECT 2: Navbar Compression Track ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });

    // --- EFFECT 3: Advanced Scroll Reveal Controller ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Kill tracking once fired for performance
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});