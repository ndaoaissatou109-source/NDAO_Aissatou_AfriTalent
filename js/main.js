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



document.addEventListener("DOMContentLoaded", () => {
  // On cible tous les spans avec la classe .counter que l'on a ajoutés dans ton HTML
  const counters = document.querySelectorAll('.counter');
  
  // Fonction qui va faire grimper le chiffre de 0 jusqu'à sa cible
  const startAnimation = (counter) => {
    const target = +counter.getAttribute('data-target'); // Récupère le nombre max (ex: 2500)
    const duration = 2000; // Durée totale de l'animation en millisecondes (2 secondes)
    const startTime = performance.now(); // Enregistre le moment précis où l'animation commence

    // Fonction de mise à jour appelée en boucle
    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      
      // On calcule le pourcentage d'avancement du temps (entre 0 et 1)
      const progress = Math.min(elapsedTime / duration, 1);
      
      // On calcule la valeur actuelle en fonction de l'avancement
      const currentNumber = Math.floor(progress * target);
      
      // On affiche le chiffre actuel dans le HTML
      counter.innerText = currentNumber;

      // Si le temps n'est pas écoulé, on demande au navigateur de continuer à la prochaine frame
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        // Par sécurité, on s'assure d'afficher exactement le nombre final à la fin
        counter.innerText = target;
      }
    };

    // Débute l'animation
    requestAnimationFrame(updateNumber);
  };

  // Configuration de l'Intersection Observer
  const observerOptions = {
    root: null,        // Surveille par rapport au viewport (l'écran de l'utilisateur)
    threshold: 0.1     // Déclenche l'animation dès que 10% de la section est visible
  };

  // Création du Scroll Observer
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Si le compteur apparaît à l'écran
      if (entry.isIntersecting) {
        const counter = entry.target;
        startAnimation(counter);     // On lance l'animation de 0 jusqu'au nombre
        observer.unobserve(counter); // On arrête d'observer pour que l'animation ne se refasse qu'une seule fois
      }
    });
  }, observerOptions);

  // On applique l'observer sur chacun de tes compteurs
  counters.forEach(counter => scrollObserver.observe(counter));
});




document.addEventListener("DOMContentLoaded", () => {
  // 1. On sélectionne toutes les sections qui doivent apparaître en fondu
  const fadeSections = document.querySelectorAll(".fade-in-section");

  // 2. On configure l'observateur
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Si la section entre dans le viewport (visible à au moins 15%)
      if (entry.isIntersecting) {
        // On lui ajoute la classe CSS qui déclenche l'animation
        entry.target.classList.add("visible");
        
        // On arrête de la surveiller (l'animation ne se fait qu'une seule fois)
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,         // Se base sur le viewport du navigateur
    threshold: 0.15     // Déclenche l'effet quand 15% de la section est visible
  });

  // 3. On lance la surveillance sur chaque section concernée
  fadeSections.forEach(section => {
    fadeObserver.observe(section);
  });
});
