/*
 * Po vytvoření Google Formuláře doplňte adresu formuláře a ID polí níže.
 * ID získáte z odkazu předvyplnění formuláře (tvar entry.123456789).
 */
const GOOGLE_FORM_CONFIG = {
    formUrl: '',
    fields: {
        name: '',
        email: '',
        attendance: '',
        guests: '',
        message: ''
    }
};

const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);

    let currentSection = '';
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 180) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const rsvpForm = document.querySelector('#rsvp-form');
const formStatus = document.querySelector('#form-status');

function isGoogleFormConfigured() {
    const fieldIds = Object.values(GOOGLE_FORM_CONFIG.fields);
    return GOOGLE_FORM_CONFIG.formUrl.trim() !== ''
        && fieldIds.length === 5
        && fieldIds.every((fieldId) => fieldId.trim() !== '');
}

function setFormStatus(message, isError = false) {
    formStatus.textContent = message;
    formStatus.classList.toggle('error', isError);
}

function getGoogleFormEndpoint() {
    const formUrl = GOOGLE_FORM_CONFIG.formUrl.trim().replace(/\/(viewform|edit)\/?$/, '');
    return `${formUrl}/formResponse`;
}

if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        setFormStatus('');

        if (!rsvpForm.reportValidity()) {
            return;
        }

        if (!isGoogleFormConfigured()) {
            setFormStatus('Formulář zatím není připojený. Prosíme, napište nám na hla.vac.lav@seznam.cz.', true);
            return;
        }

        const submitButton = rsvpForm.querySelector('.submit-button');
        const formData = new FormData(rsvpForm);
        const googleFormData = new URLSearchParams();

        Object.entries(GOOGLE_FORM_CONFIG.fields).forEach(([fieldName, fieldId]) => {
            googleFormData.append(`entry.${fieldId}`, formData.get(fieldName) || '');
        });

        submitButton.disabled = true;
        submitButton.textContent = 'Odesílám…';

        try {
            await fetch(getGoogleFormEndpoint(), {
                body: googleFormData,
                method: 'POST',
                mode: 'no-cors'
            });
            setFormStatus('Děkujeme, vaše odpověď byla odeslána. Těšíme se na vás.');
            rsvpForm.reset();
        } catch (error) {
            setFormStatus('Odpověď se nepodařilo odeslat. Zkuste to prosím znovu nebo nám napište e-mailem.', true);
            console.error('Odeslání RSVP do Google Forms selhalo:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Odeslat odpověď';
        }
    });
}
