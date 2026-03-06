/* ============================================================
   PORTFOLIO.JS — Logique de la page portfolio
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- 1. Compteurs animés dans le hero ----
    const counters = [
        { id: 'counterSites',   target: 12, suffix: '+' },
        { id: 'counterClients', target: 10, suffix: '+' },
        { id: 'counterYears',   target: 2,  suffix: '' }
    ];

    const animateCounter = (el, target, suffix) => {
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + suffix;
            if (current >= target) clearInterval(timer);
        }, 45);
    };

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(c => {
                    const el = document.getElementById(c.id);
                    if (el) animateCounter(el, c.target, c.suffix);
                });
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.portfolio-hero');
    if (heroSection) heroObserver.observe(heroSection);


    // ---- 2. Filtres de projets ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mettre à jour le bouton actif
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    card.offsetHeight; // reflow
                    card.style.animation = 'fadeInUp 0.4s ease both';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    // ---- 3. Modal de détail projet ----
    const projects = {
        ainoa: {
            title: 'Aïnoa Coiffure',
            type: 'Site Vitrine',
            year: '2024',
            url: 'https://anne373.github.io/Site-Ainoa/',
            description: "Site vitrine \u00e9l\u00e9gant et moderne pour le salon de coiffure A\u00efnoa \u00e0 Saint-Cyr-sur-Loire. Le projet inclut un carrousel d\u2019images dynamique, une section d\u00e9di\u00e9e au Head SPA, une galerie de cr\u00e9ations, et une int\u00e9gration de prise de rendez-vous via Planity.",
            tags: ['HTML/CSS', 'JavaScript', 'Design', 'SEO', 'Responsive'],
            features: [
                'Hero avec carrousel de photos',
                'Section Head SPA avec sous-page dédiée',
                'Galerie de créations coiffure',
                'Prise de rendez-vous en ligne (Planity)',
                'Design responsive tous écrans',
            ]
        },
        descodes: {
            title: 'DesCodes – Site Pro',
            type: 'Site Complet',
            year: '2025',
            url: 'https://batoucode.github.io/site-pro/index.html',
            description: 'Site professionnel complet pour l\'agence DesCodes. Présentation des services numériques, des offres tarifaires, du processus de travail, d\'une section À propos et d\'un formulaire de contact. Comprend un mode sombre/clair et un design futuriste.',
            tags: ['HTML/CSS', 'JavaScript', 'Dark Mode', 'Responsive', 'Multi-page'],
            features: [
                'Mode sombre / mode clair',
                'Hero section animé',
                'Grille de services',
                'Section tarifs & packs',
                'Processus étape par étape',
                'Formulaire de contact intégré',
            ]
        }
    };

    window.openModal = function (projectKey) {
        const project = projects[projectKey];
        if (!project) return;

        const featuresList = project.features.map(f => `<li><i class="fas fa-check-circle" style="color:var(--neon-blue);margin-right:8px;"></i>${f}</li>`).join('');
        const tagsList = project.tags.map(t => `<span class="tag">${t}</span>`).join('');

        document.getElementById('modalBody').innerHTML = `
            <div class="modal-iframe-wrapper">
                <iframe src="${project.url}" title="${project.title}" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
            </div>
            <div class="modal-project-info">
                <div class="modal-meta">
                    <span class="project-type"><i class="fas fa-store"></i> ${project.type}</span>
                    <span class="project-year">${project.year}</span>
                </div>
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div class="project-tags">${tagsList}</div>
                <h3 style="font-size:1.2rem;margin-bottom:12px;">Fonctionnalités clés</h3>
                <ul style="list-style:none;margin-bottom:24px;padding:0;">${featuresList}</ul>
                <div class="modal-actions">
                    <a href="${project.url}" target="_blank" rel="noopener" class="btn btn-neon">
                        <i class="fas fa-external-link-alt"></i> Visiter le site
                    </a>
                    <a href="../index.html#contact" class="btn">
                        <i class="fas fa-paper-plane"></i> Commander un site similaire
                    </a>
                </div>
            </div>
        `;

        const modal = document.getElementById('projectModal');
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function () {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('open');
        document.body.style.overflow = '';
        // Nettoyer l'iframe pour arrêter les ressources
        setTimeout(() => {
            document.getElementById('modalBody').innerHTML = '';
        }, 350);
    };

    // Fermeture avec Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') window.closeModal();
    });


    // ---- 4. Synchronisation du toggle thème (idem script.js) ----
    const syncThemeToggles = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isLight = currentTheme === 'light';
        document.querySelectorAll('#themeToggle, #mobileThemeToggle, #mobileNavThemeToggle').forEach(toggle => {
            toggle.checked = isLight;
        });
    };

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        syncThemeToggles();
    };

    syncThemeToggles();

    document.querySelectorAll('#themeToggle, #mobileThemeToggle, #mobileNavThemeToggle').forEach(toggle => {
        toggle.addEventListener('change', function () {
            applyTheme(this.checked ? 'light' : 'dark');
        });
    });

    // ---- 5. Menu mobile ----
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenuBtn = document.getElementById('closeMenu');

    if (mobileMenuBtn && mobileNav && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => mobileNav.classList.add('open'));
        closeMenuBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileNav.classList.remove('open'));
        });
    }

});
