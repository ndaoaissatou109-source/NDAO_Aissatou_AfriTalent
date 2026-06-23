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


// champ de formulair 
    

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successAlert = document.getElementById("successAlert");

  // Récupération de tous les champs
  const lastName = document.getElementById("lastName");
  const firstName = document.getElementById("firstName");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  // Récupération des blocs de texte d'erreur pour personnaliser les messages
  const lastNameError = document.getElementById("lastNameError");
  const firstNameError = document.getElementById("firstNameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  form.addEventListener("submit", (e) => {
    // Empêche le rechargement de la page
    e.preventDefault();

    // Variable témoin de validité
    let isFormValid = true;

    // Expression régulière pour valider le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // --------------------------------------------------------
    // VALIDER LE NOM
    // --------------------------------------------------------
    if (lastName.value.trim() === "") {
      lastNameError.innerText = "Le nom est obligatoire.";
      lastName.classList.add("is-invalid");
      lastName.classList.remove("is-valid");
      isFormValid = false;
    } else {
      lastName.classList.remove("is-invalid");
      lastName.classList.add("is-valid");
    }

    // --------------------------------------------------------
    // VALIDER LE PRÉNOM
    // --------------------------------------------------------
    if (firstName.value.trim() === "") {
      firstNameError.innerText = "Le prénom est obligatoire.";
      firstName.classList.add("is-invalid");
      firstName.classList.remove("is-valid");
      isFormValid = false;
    } else {
      firstName.classList.remove("is-invalid");
      firstName.classList.add("is-valid");
    }

    // --------------------------------------------------------
    // VALIDER L'EMAIL (Requis + Format Regex)
    // --------------------------------------------------------
    if (email.value.trim() === "") {
      emailError.innerText = "L'adresse email est obligatoire.";
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
      isFormValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      emailError.innerText = "Le format de l'email est invalide (ex: nom@domaine.com).";
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
      isFormValid = false;
    } else {
      email.classList.remove("is-invalid");
      email.classList.add("is-valid");
    }

    // --------------------------------------------------------
    // VALIDER LE SUJET (Menu déroulant)
    // --------------------------------------------------------
    if (subject.value === "") {
      subjectError.innerText = "Veuillez sélectionner un sujet dans la liste.";
      subject.classList.add("is-invalid");
      subject.classList.remove("is-valid");
      isFormValid = false;
    } else {
      subject.classList.remove("is-invalid");
      subject.classList.add("is-valid");
    }

    // --------------------------------------------------------
    // VALIDER LE MESSAGE (Requis + 20 caractères min)
    // --------------------------------------------------------
    const messageValue = message.value.trim();
    if (messageValue === "") {
      messageError.innerText = "Le message ne peut pas être vide.";
      message.classList.add("is-invalid");
      message.classList.remove("is-valid");
      isFormValid = false;
    } else if (messageValue.length < 20) {
      messageError.innerText = `Le message doit faire au moins 20 caractères (Actuellement : ${messageValue.length}/20).`;
      message.classList.add("is-invalid");
      message.classList.remove("is-valid");
      isFormValid = false;
    } else {
      message.classList.remove("is-invalid");
      message.classList.add("is-valid");
    }

    // --------------------------------------------------------
    // TOUT EST VALIDE : Affichage du succès
    // --------------------------------------------------------
    if (isFormValid) {
      // 1. On affiche l'alerte de succès en retirant la classe 'd-none' de Bootstrap
      successAlert.classList.remove("d-none");
      successAlert.classList.add("show"); // Ajoute l'effet d'apparition fluide de Bootstrap

      // 2. On réinitialise complètement le formulaire
      form.reset();

      // 3. On retire proprement les bordures vertes '.is-valid' après l'envoi
      const inputs = form.querySelectorAll(".form-control, .form-select");
      inputs.forEach(input => input.classList.remove("is-valid"));

      // 4. Optionnel : On fait remonter la page automatiquement vers l'alerte de succès
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      // Si une erreur subsiste lors d'une tentative, on masque l'ancien message de succès
      successAlert.classList.add("d-none");
      successAlert.classList.remove("show");
    }
  });
});



// Attend que la page HTML soit complètement chargée avant d'exécuter le script
document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. SÉLECTION DES ÉLÉMENTS HTML (FILTRES ET COMPTEURS)
  // ==========================================
  const toutBtn = document.getElementById("toutBtn");
  const filterList = document.getElementById("filterList");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".freelance-item");
  
  // Sélection de tous les spans avec la classe .counter pour les statistiques
  const counters = document.querySelectorAll('.counter');


  // ==========================================
  // 2. GESTION DU MENU DÉROULANT (BOUTON PRINCIPAL)
  // ==========================================
  
  // Écoute le clic sur le bouton principal pour ouvrir ou fermer la liste
  toutBtn.addEventListener("click", (e) => {
    // Empêche le clic de se propager aux éléments parents (évite la fermeture immédiate)
    e.stopPropagation();
    
    // Ajoute la classe `.show` si elle n'est pas là, ou l'enlève si elle y est (effet interrupteur)
    filterList.classList.toggle("show");
  });

  // Écoute les clics n'importe où sur la page globale
  document.addEventListener("click", () => {
    // Si l'utilisateur clique ailleurs que sur le bouton, on ferme automatiquement la liste
    filterList.classList.remove("show");
  });


  // ==========================================
  // 3. LOGIQUE DU FILTRAGE DYNAMIQUE
  // ==========================================
  
  // On applique un écouteur de clic sur CHAQUE bouton de filtre de la liste
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      
      // Récupère la valeur du filtre du bouton cliqué (ex: "developpement", "marketing" ou "all")
      const selectedFilter = button.getAttribute("data-filter");

      // Met à jour dynamiquement le texte du bouton principal avec le nom du filtre choisi
      toutBtn.innerHTML = `${button.textContent} <span>▼</span>`;

      // Boucle à travers chaque profil (chaque colonne `.freelance-item`)
      items.forEach((item) => {
        
        // Trouve la carte (`.card`) située à l'intérieur de cette colonne spécifique
        const card = item.querySelector(".card");
        
        // Récupère la catégorie stockée dans le 'data-category' de la carte
        const cardCategory = card ? card.getAttribute("data-category") : null;

        // VÉRIFICATION : Est-ce qu'on doit afficher cette carte ?
        if (selectedFilter === "all" || cardCategory === selectedFilter) {
          // Affiche la colonne. L'utilisation de "important" court-circuicte les styles Bootstrap.
          item.style.setProperty("display", "block", "important"); 
        } else {
          // Cache COMPLÈTEMENT la colonne. 
          item.style.setProperty("display", "none", "important");  
        }
      });
    });
  });


  // ==========================================
  // 4. ANIMATION DES COMPTEURS AU SCROLL (SCROLL OBSERVER)
  // ==========================================

  // Fonction qui fait grimper le chiffre de 0 jusqu'à sa cible
  const startCounterAnimation = (counter) => {
    const target = +counter.getAttribute('data-target'); // Récupère le nombre max (ex: 2500)
    const duration = 2000; // L'animation dure 2 secondes (2000ms) pour chaque compteur
    const startTime = performance.now(); // Enregistre l'heure exacte du début de l'animation

    // Fonction de rafraîchissement appelée en boucle par le navigateur
    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      
      // Calcule la progression temporelle (bloquée à 1 max soit 100%)
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Calcule la valeur actuelle proportionnelle à la progression
      const currentNumber = Math.floor(progress * target);
      
      // Injecte le chiffre actuel dans la balise HTML
      counter.innerText = currentNumber;

      // Si l'animation n'est pas finie, on redemande une frame
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        // Sécurité pour afficher exactement le chiffre cible à la fin
        counter.innerText = target;
      }
    };

    // Démarre la boucle d'animation
    requestAnimationFrame(updateNumber);
  };

  // Configuration du Scroll Observer
  const observerOptions = {
    root: null,        // Utilise la fenêtre du navigateur comme zone de détection
    threshold: 0.15     // Déclenche l'animation dès que 15% du compteur est visible à l'écran
  };

  // Initialisation de l'IntersectionObserver pour les compteurs
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Si un compteur franchit la ligne d'horizon et devient visible
      if (entry.isIntersecting) {
        const counter = entry.target;
        startCounterAnimation(counter); // Lance l'animation de 0 à la valeur cible
        observer.unobserve(counter);    // Arrête de surveiller ce compteur pour ne pas relancer l'effet
      }
    });
  }, observerOptions);

  // Demande à l'observer de surveiller chacun de tes compteurs statistiques
  counters.forEach(counter => scrollObserver.observe(counter));

});