// Gestion du thème
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const mobileNavThemeToggle = document.getElementById('mobileNavThemeToggle');
const html = document.documentElement;

// Vérifier le thème sauvegardé ou la préférence système
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

// Appliquer le thème sauvegardé
html.setAttribute('data-theme', savedTheme);

// Mettre à jour les toggles
if (savedTheme === 'light') {
    themeToggle.checked = true;
    mobileThemeToggle.checked = true;
    mobileNavThemeToggle.checked = true;
}

// Fonction pour changer de thème
function toggleTheme(isLight) {
    if (isLight) {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Écouteurs d'événements pour les toggles
themeToggle.addEventListener('change', function() {
    toggleTheme(this.checked);
    mobileThemeToggle.checked = this.checked;
    mobileNavThemeToggle.checked = this.checked;
});

mobileThemeToggle.addEventListener('change', function() {
    toggleTheme(this.checked);
    themeToggle.checked = this.checked;
    mobileNavThemeToggle.checked = this.checked;
});

mobileNavThemeToggle.addEventListener('change', function() {
    toggleTheme(this.checked);
    themeToggle.checked = this.checked;
    mobileThemeToggle.checked = this.checked;
});

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
document.querySelectorAll('.service-card, .step, .about-content, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
