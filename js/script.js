// Gestion du thème
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const mobileNavThemeToggle = document.getElementById('mobileNavThemeToggle');
const html = document.documentElement;

// Fonction pour mettre à jour l'état visuel des toggles
function updateToggles(isLight) {
    if (themeToggle) themeToggle.checked = isLight;
    if (mobileThemeToggle) mobileThemeToggle.checked = isLight;
    if (mobileNavThemeToggle) mobileNavThemeToggle.checked = isLight;
}

// Fonction pour synchroniser le thème depuis localStorage
function syncTheme() {
    const currentTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    html.setAttribute('data-theme', currentTheme);
    updateToggles(currentTheme === 'light');
}

// Initialiser au chargement
syncTheme();

// Fonction pour changer de thème
function toggleTheme(isLight) {
    const newTheme = isLight ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggles(isLight);
}

// Écouter les changements depuis d'autres onglets
window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
        syncTheme();
    }
});

// Forcer la synchronisation quand on revient sur l'onglet
window.addEventListener('pageshow', syncTheme);
window.addEventListener('focus', syncTheme);

// Écouteurs d'événements pour les toggles
if (themeToggle) {
    themeToggle.addEventListener('change', function () {
        toggleTheme(this.checked);
    });
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('change', function () {
        toggleTheme(this.checked);
    });
}

if (mobileNavThemeToggle) {
    mobileNavThemeToggle.addEventListener('change', function () {
        toggleTheme(this.checked);
    });
}

// Menu mobile
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const closeMenu = document.getElementById('closeMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileNav.classList.remove('active');
});

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// Fermer le menu en cliquant en dehors
document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileNav.classList.remove('active');
    }
});

// Formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération des données du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // Simulation d'envoi
        alert(`Merci ${name}! Votre message concernant "${getServiceName(service)}" a été envoyé. Nous vous répondrons à ${email} dans les plus brefs délais.`);

        // Réinitialisation du formulaire
        contactForm.reset();
    });
}

function getServiceName(value) {
    const services = {
        'site': 'Site personnel pour professionnel',
        'app': 'Application web ou mobile',
        'ia': 'Solution d\'IA personnalisée',
        'multiple': 'Plusieurs services',
        'autre': 'Autre projet'
    };
    return services[value] || 'votre projet';
}

// Animation du header au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    }
});

// Effet de surbrillance sur les sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les sections importantes
document.querySelectorAll('.service-card, .step, .about-content, .contact-info, .contact-form, .pricing-card, .secondary-card, .alc-item').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
