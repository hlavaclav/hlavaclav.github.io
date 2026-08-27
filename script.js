// === Odpočet do svatby ===
const weddingDate = new Date('2027-06-15T14:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<p style="font-size: 1.5rem; color: var(--primary);">Jsme svoji! 💕</p>';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
}

// Aktualizace každou minutu
updateCountdown();
setInterval(updateCountdown, 60000);

// === Plynulé scrollování ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === Animace při scrollování ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Sledování elementů
document.querySelectorAll('.story-card, .detail-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// === RSVP formulář ===
const rsvpForm = document.querySelector('.rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitButton = rsvpForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        const formData = new FormData(rsvpForm);
        
        // Získání hodnot
        const name = rsvpForm.querySelector('input[type="text"]').value;
        const email = rsvpForm.querySelector('input[type="email"]').value;
        const attendance = rsvpForm.querySelector('input[name="attendance"]:checked').value;
        
        // Animace odeslání
        submitButton.textContent = 'Odesílání...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        // Simulace odeslání (zde by bylo skutečné odeslání na server)
        setTimeout(() => {
            if (attendance === 'yes') {
                submitButton.textContent = 'Děkujeme! Těšíme se na Vás 💕';
                submitButton.style.background = '#6BCB77';
            } else {
                submitButton.textContent = 'Děkujeme za odpověď 💐';
                submitButton.style.background = '#8B7355';
            }
            
            // Zde by bylo skutečné odeslání dat:
            console.log('RSVP data:', {
                name,
                email,
                attendance,
                formData: Object.fromEntries(formData)
            });
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.style.background = '';
                rsvpForm.reset();
            }, 3000);
        }, 1500);
    });
}

// === Sledování scroll pozice pro navigation ===
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Skrytí/zobrazení navigace při scrollování
    if (currentScroll > lastScroll && currentScroll > 150) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// === Přidání přechodů pro header ===
header.style.transition = 'transform 0.4s ease';

// === Jemný parallax efekt pro pozadí ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const softBg = document.querySelector('.soft-background');
    if (softBg) {
        softBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// === Interaktivní logo ===
const logo = document.querySelector('.logo');
let clickCount = 0;

logo.addEventListener('click', () => {
    clickCount++;
    
    // Jemná animace
    logo.style.transform = 'scale(1.05)';
    setTimeout(() => {
        logo.style.transform = 'scale(1)';
    }, 300);
    
    // Srdíčka při třetím kliknutí
    if (clickCount === 3) {
        createHearts();
        clickCount = 0;
    }
});

// === Srdicka animace (easter egg) ===
function createHearts() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💕';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.style.transition = 'all 3s ease-out';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.style.top = '-100px';
                heart.style.opacity = '0';
                heart.style.transform = `translateX(${(Math.random() - 0.5) * 200}px)`;
            }, 100);
            
            setTimeout(() => {
                heart.remove();
            }, 3100);
        }, i * 100);
    }
}

// === Zvýraznění aktuální sekce v navigaci ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
});

// === Konec scriptu ===
console.log('💕 Svatební stránky V & H načteny!');
console.log('💡 Tip: Klikněte 3× na logo pro překvapení 💕');
