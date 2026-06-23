document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. TOGGLE DARK/LIGHT MODE (ID: themeToggle)
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggle');
    // On cible l'icône <i> à l'intérieur du bouton pour pouvoir la changer
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null; 
    
    // Vérifie le choix précédent dans le localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        // Si c'est le mode sombre, on met l'icône du soleil
        if (themeIcon) {
            themeIcon.className = "bi bi-sun-fill";
        }
    }

    // Événement au clic pour basculer de thème
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            const isDark = document.body.classList.contains('dark-theme');
            
            // Sauvegarde le choix et change l'icône dynamiquement
            if (isDark) {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.className = "bi bi-sun-fill"; // Icône Soleil
            } else {
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.className = "bi bi-moon-stars-fill"; // Icône Lune
            }
        });
    }

    // ==========================================
    // 2. NAVBAR DYNAMIQUE & BOUTON RETOUR EN HAUT
    // ==========================================
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // --- Gestion de la Navbar au Scroll ---
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // --- Gestion du bouton Retour en Haut ---
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('scroll-show');
        } else {
            backToTopBtn.classList.remove('scroll-show');
        }
    });

    // Action du clic sur le bouton Retour en Haut
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Attend que le HTML soit complètement chargé
document.addEventListener("DOMContentLoaded", () => {
    
    const backToTopBtn = document.getElementById('back-to-top');

    // Écoute l'événement de scroll sur la page
    window.addEventListener('scroll', () => {
        // window.scrollY donne la position actuelle du scroll en pixels
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('scroll-show'); // Applique la classe d'apparition
        } else {
            backToTopBtn.classList.remove('scroll-show'); // Retire le bouton si on remonte
        }
    });

    // Événement au clic sur le bouton
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // 👈 Effet de défilement fluide demandé par le prof
            });
        });
    }
});
