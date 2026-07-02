document.addEventListener('DOMContentLoaded', () => {
    
    // --- EFFECT 1: Safe Typewriter Configuration ---
    const typewriterElem = document.querySelector('.typewriter');
    
    // Run ONLY if the element is detected on the current active page
    if (typewriterElem) {
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
                typeSpeed = 1800; 
                isDeleting = true;
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; 
            }

            setTimeout(() => type(), typeSpeed);
        }
        type();
    }

    // --- EFFECT 2: Navbar Compression Track (All Pages) ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shrink');
            } else {
                navbar.classList.remove('shrink');
            }
        });
    }

    // --- EFFECT 3: Safe Scroll Reveal Controller ---
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
                }
            });
        }, revealOptions);

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
});