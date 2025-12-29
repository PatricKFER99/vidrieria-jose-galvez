document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENÚ MÓVIL PROFESIONAL ---
    const hamburger = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const icon = hamburger ? hamburger.querySelector('i') : null;

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Alternar clase 'active' para que el CSS haga la animación de deslizar
            navLinks.classList.toggle('active');

            // Cambiar el icono: de Barras (fa-bars) a X (fa-times)
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Cerrar el menú automáticamente al hacer clic en un enlace
    document.querySelectorAll('.nav-link, .btn-nav').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- 2. ANIMACIONES AL HACER SCROLL (EFECTO APARICIÓN) ---
    const observerOptions = {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Agrega clase para animar
                observer.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    }, observerOptions);

    // Seleccionamos qué elementos queremos animar
    const elementsToAnimate = document.querySelectorAll('.card, .hero-content, .text-wrapper, .image-wrapper');
    
    elementsToAnimate.forEach((el) => {
        // Añadimos una clase base en JS para prepararlos (opcional si ya está en CSS)
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        
        // Cuando la clase 'visible' se agrega, volvemos a la normalidad
        // Nota: Esto funciona en conjunto con el observer de arriba
        observer.observe(el);
    });

    // Inyectamos el estilo de la clase .visible dinámicamente para asegurar que funcione
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});