// ==========================================
// MÓDULO DE NAVEGACIÓN CON DROPDOWN
// ==========================================

function initNavigation() {
    console.log('Iniciando navegación...');
    
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    const navLinks = document.querySelectorAll('.nav__link');
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown');

    // ====================================
    // MENÚ MÓVIL
    // ====================================
    
    // Toggle menu móvil
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navList.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            if (navList.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // ====================================
    // DROPDOWN MENU (MÓVIL)
    // ====================================
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        
        if (link) {
            link.addEventListener('click', (e) => {
                // Solo en móvil (menos de 768px)
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Toggle dropdown
                    item.classList.toggle('active');
                    
                    // Cerrar otros dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // ====================================
    // CERRAR MENÚ
    // ====================================
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        // Solo cerrar si no es el link del dropdown
        if (!link.closest('.nav__item--dropdown')) {
            link.addEventListener('click', () => {
                closeMenu();
            });
        }
    });
    
    // Cerrar menú en enlaces del dropdown
    document.querySelectorAll('.dropdown__link').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    function closeMenu() {
        if (navToggle && navList) {
            navToggle.classList.remove('active');
            navList.classList.remove('active');
            document.body.style.overflow = '';
            
            // Cerrar dropdowns
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    }

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (navList && navToggle) {
            const isClickInsideNav = navList.contains(e.target) || navToggle.contains(e.target);
            
            if (!isClickInsideNav && navList.classList.contains('active')) {
                closeMenu();
            }
        }
    });
    
    // Cerrar menú al presionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList && navList.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Cerrar dropdowns en móvil al cambiar orientación
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // ====================================
    // SCROLL SPY
    // ====================================
    
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"], .dropdown__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remover active de todos los links
                navLinks.forEach(link => link.classList.remove('active'));
                document.querySelectorAll('.dropdown__link').forEach(link => link.classList.remove('active'));
                
                // Agregar active al link actual
                if (navLink) {
                    navLink.classList.add('active');
                    
                    // Si está en un dropdown, también activar el link principal
                    const parentDropdown = navLink.closest('.nav__item--dropdown');
                    if (parentDropdown) {
                        const mainLink = parentDropdown.querySelector('.nav__link');
                        if (mainLink) {
                            mainLink.classList.add('active');
                        }
                    }
                }
            }
        });
    }

    // ====================================
    // HEADER CON EFECTO SCROLL
    // ====================================
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveLink();
    }

    window.addEventListener('scroll', handleScroll);

    // ====================================
    // SCROLL SUAVE
    // ====================================
    
    // Todos los links internos (incluyendo dropdown)
    const allInternalLinks = document.querySelectorAll('.nav__link[href^="#"], .dropdown__link[href^="#"]');
    
    allInternalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const offsetTop = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar URL sin scroll
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Ejecutar scroll spy al cargar
    updateActiveLink();
    
    console.log('✅ Navegación con dropdown inicializada');
}